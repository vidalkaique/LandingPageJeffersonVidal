// ============================================
// VERCEL SERVERLESS FUNCTION: Create Payment Link
// ============================================

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Configuração Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuração Asaas
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_BASE_URL = 'https://api.asaas.com/v3';
const SUCCESS_REDIRECT_URL = 'https://obrigado-pela-compra-two.vercel.app/';

interface CreatePaymentLinkRequest {
  planoId: string;
  paymentType: 'pix' | 'cartao';
  customerEmail?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { planoId, paymentType, customerEmail } = req.body as CreatePaymentLinkRequest;

    // Validações
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

    if (!ASAAS_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'API Key Asaas não configurada'
      });
    }

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
    const timestamp = Date.now();
    const externalReference = `${planoId}_${paymentType}_${timestamp}`;

    // 4. Criar link de pagamento no Asaas
    // Para links de pagamento, usar estrutura correta da API
    const asaasRequestData: any = {
      name: `${plano.nome} - Jefferson Personal`,
      description: `Pagamento via ${paymentType.toUpperCase()} - Treino personalizado`,
      value: valor,
      chargeType: 'DETACHED', // Tipo de cobrança obrigatório
      dueDateLimitDays: 1, // 1 dia útil para vencimento
      callback: {
        successUrl: SUCCESS_REDIRECT_URL,
        autoRedirect: true
      },
      externalReference,
      notificationEnabled: true
    };

    // Configurações específicas por tipo de pagamento
    if (paymentType === 'pix') {
      asaasRequestData.billingType = 'PIX';
    } else if (paymentType === 'cartao') {
      asaasRequestData.billingType = 'CREDIT_CARD';
      asaasRequestData.maxInstallmentCount = 2; // Máximo 2x conforme solicitado
    }

    const asaasResponse = await fetch(`${ASAAS_BASE_URL}/paymentLinks`, {
      method: 'POST',
      headers: {
        'access_token': ASAAS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(asaasRequestData)
    });

    const asaasData = await asaasResponse.json();

    if (!asaasResponse.ok) {
      console.error('Erro Asaas:', asaasData);
      const errorMessage = asaasData.errors?.map((e: any) => e.description).join(', ') || 'Erro desconhecido';
      return res.status(500).json({
        success: false,
        error: `Erro Asaas: ${errorMessage}`
      });
    }

    // 5. Salvar log no banco de dados
    const { data: logEntry, error: logError } = await supabase
      .from('payment_logs')
      .insert([{
        plano_id: planoId,
        payment_type: paymentType,
        asaas_link_id: asaasData.id,
        asaas_link_url: asaasData.url,
        customer_email: customerEmail,
        amount: valor,
        external_reference: externalReference,
        status: 'created'
      }])
      .select()
      .single();

    if (logError) {
      console.error('Erro ao salvar log:', logError);
      // Não falha a operação, apenas loga o erro
    }

    // 6. Resposta de sucesso
    return res.status(200).json({
      success: true,
      paymentUrl: asaasData.url,
      logId: logEntry?.id
    });

  } catch (error) {
    console.error('Erro interno:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    });
  }
}
