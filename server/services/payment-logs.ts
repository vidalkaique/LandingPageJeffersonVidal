// ============================================
// SERVICE: Payment Logs
// DESCRIÇÃO: Serviço para gerenciar logs de pagamento no Supabase
// ============================================

import { createClient } from '@supabase/supabase-js';
import type { PaymentLogEntry, PaymentStats } from '../../shared/asaas-types';

// Configuração Supabase - com fallback para evitar erro no build
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Validação apenas em runtime, não no build
const validateSupabaseConfig = () => {
  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error('Variáveis de ambiente Supabase não configuradas');
  }
};

const supabase = createClient(supabaseUrl, supabaseKey);

export class PaymentLogsService {
  static async createLog(data: {
    plano_id: string;
    payment_type: 'pix' | 'cartao';
    asaas_link_id: string;
    asaas_link_url: string;
    customer_email?: string;
    amount: number;
    external_reference?: string;
  }): Promise<PaymentLogEntry> {
    try {
      validateSupabaseConfig();
      const { data: logEntry, error } = await supabase
        .from('payment_logs')
        .insert([{
          plano_id: data.plano_id,
          payment_type: data.payment_type,
          asaas_link_id: data.asaas_link_id,
          asaas_link_url: data.asaas_link_url,
          customer_email: data.customer_email,
          amount: data.amount,
          external_reference: data.external_reference,
          status: 'created'
        }])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar log de pagamento:', error);
        throw new Error(`Erro ao salvar log: ${error.message}`);
      }

      return logEntry;
    } catch (error) {
      console.error('Erro no serviço de logs:', error);
      throw error;
    }
  }

  static async updateLogStatus(
    logId: string, 
    status: 'paid' | 'failed' | 'expired'
  ): Promise<PaymentLogEntry> {
    try {
      const { data: logEntry, error } = await supabase
        .from('payment_logs')
        .update({ status })
        .eq('id', logId)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar status do log:', error);
        throw new Error(`Erro ao atualizar log: ${error.message}`);
      }

      return logEntry;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  }

  static async getLogsByPlano(planoId: string): Promise<PaymentLogEntry[]> {
    try {
      const { data: logs, error } = await supabase
        .from('payment_logs')
        .select('*')
        .eq('plano_id', planoId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar logs por plano:', error);
        throw new Error(`Erro ao buscar logs: ${error.message}`);
      }

      return logs || [];
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      throw error;
    }
  }

  static async getRecentLogs(limit: number = 50): Promise<PaymentLogEntry[]> {
    try {
      const { data: logs, error } = await supabase
        .from('payment_logs')
        .select(`
          *,
          planos:plano_id (
            nome,
            tipo
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Erro ao buscar logs recentes:', error);
        throw new Error(`Erro ao buscar logs: ${error.message}`);
      }

      return logs || [];
    } catch (error) {
      console.error('Erro ao buscar logs recentes:', error);
      throw error;
    }
  }

  static async getPaymentStats(): Promise<PaymentStats> {
    try {
      const { data: stats, error } = await supabase
        .rpc('get_payment_stats');

      if (error) {
        console.error('Erro ao buscar estatísticas:', error);
        throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
      }

      return stats || {
        total_links_created: 0,
        total_paid: 0,
        total_pending: 0,
        total_failed: 0,
        revenue_pix: 0,
        revenue_cartao: 0,
        last_30_days: 0
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }

  static async findLogByExternalReference(externalRef: string): Promise<PaymentLogEntry | null> {
    try {
      const { data: log, error } = await supabase
        .from('payment_logs')
        .select('*')
        .eq('external_reference', externalRef)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Erro ao buscar log por referência:', error);
        throw new Error(`Erro ao buscar log: ${error.message}`);
      }

      return log || null;
    } catch (error) {
      console.error('Erro ao buscar por referência:', error);
      throw error;
    }
  }
}
