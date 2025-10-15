// ============================================
// ROUTES: Payment Links API
// DESCRIÇÃO: Endpoints para criação de links de pagamento via Asaas
// ============================================

import { Router, type Request, Response } from 'express';
import { AsaasService } from '../services/asaas';
import { PaymentLogsService } from '../services/payment-logs';
import { createClient } from '@supabase/supabase-js';
import type { 
  CreatePaymentLinkRequest, 
  CreatePaymentLinkResponse,
  PaymentLogEntry,
  PaymentStats
} from '../../shared/asaas-types';

const router = Router();

// Configuração Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para validação de entrada
const validatePaymentRequest = (req: Request, res: Response, next: Function) => {
  const { planoId, paymentType } = req.body as CreatePaymentLinkRequest;
  
  if (!planoId || typeof planoId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'planoId é obrigatório e deve ser uma string'
    });
  }
  
  if (!paymentType || !['pix', 'cartao'].includes(paymentType)) {
    return res.status(400).json({
      success: false,
      error: 'paymentType deve ser "pix" ou "cartao"'
    });
  }
  
  next();
};

// POST /api/payments/create-link
// Criar link de pagamento via Asaas
router.post('/create-link', validatePaymentRequest, async (req: Request, res: Response) => {
  try {
    const { planoId, paymentType, customerEmail } = req.body as CreatePaymentLinkRequest;
    
    // 1. Buscar dados do plano no Supabase
    const { data: plano, error: planoError } = await supabase
      .from('planos')
      .select('*')
      .eq('id', planoId)
      .single();
    
    if (planoError || !plano) {
      return res.status(404).json({
        success: false,
        error: 'Plano não encontrado'
      });
    }
    
    // 2. Determinar valor baseado no tipo de pagamento
    const valor = paymentType === 'pix' 
      ? parseFloat(plano.preco_pix?.replace(/[^\d,]/g, '').replace(',', '.') || '0')
      : parseFloat(plano.preco_cartao?.replace(/[^\d,]/g, '').replace(',', '.') || '0');
    
    if (valor <= 0) {
      return res.status(400).json({
        success: false,
        error: `Preço ${paymentType} não configurado para este plano`
      });
    }
    
    // 3. Gerar referência externa única
    const externalReference = AsaasService.generateExternalReference(planoId, paymentType);
    
    // 4. Criar link de pagamento no Asaas
    const asaasResponse = await AsaasService.createPaymentLink(
      plano.nome,
      valor,
      paymentType,
      externalReference
    );
    
    // 5. Salvar log no banco de dados
    const logEntry = await PaymentLogsService.createLog({
      plano_id: planoId,
      payment_type: paymentType,
      asaas_link_id: asaasResponse.id,
      asaas_link_url: asaasResponse.url,
      customer_email: customerEmail,
      amount: valor,
      external_reference: externalReference
    });
    
    // 6. Resposta de sucesso
    const response: CreatePaymentLinkResponse = {
      success: true,
      paymentUrl: asaasResponse.url,
      logId: logEntry.id
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('Erro ao criar link de pagamento:', error);
    
    const response: CreatePaymentLinkResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    };
    
    res.status(500).json(response);
  }
});

// GET /api/payments/logs/:planoId
// Buscar logs de pagamento por plano
router.get('/logs/:planoId', async (req: Request, res: Response) => {
  try {
    const { planoId } = req.params;
    
    if (!planoId) {
      return res.status(400).json({
        success: false,
        error: 'planoId é obrigatório'
      });
    }
    
    const logs = await PaymentLogsService.getLogsByPlano(planoId);
    
    res.json({
      success: true,
      logs
    });
    
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    });
  }
});

// GET /api/payments/stats
// Buscar estatísticas de pagamento
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await PaymentLogsService.getPaymentStats();
    
    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    });
  }
});

// GET /api/payments/recent
// Buscar logs recentes
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const logs = await PaymentLogsService.getRecentLogs(limit);
    
    res.json({
      success: true,
      logs
    });
    
  } catch (error) {
    console.error('Erro ao buscar logs recentes:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    });
  }
});

// POST /api/payments/webhook
// Webhook para receber notificações do Asaas (futuro)
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    // TODO: Implementar webhook do Asaas para atualizar status dos pagamentos
    console.log('Webhook recebido:', req.body);
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Erro no webhook' });
  }
});

export default router;
