// ============================================
// HOOK: usePayments
// DESCRIÇÃO: Hook personalizado para gerenciar pagamentos via Asaas
// ============================================

import { useState, useCallback } from 'react';
import type { 
  CreatePaymentLinkRequest, 
  CreatePaymentLinkResponse,
  PaymentLogEntry,
  PaymentStats
} from '../../../shared/asaas-types';

interface UsePaymentsReturn {
  createPaymentLink: (planoId: string, paymentType: 'pix' | 'cartao', customerEmail?: string) => Promise<string>;
  getPaymentLogs: (planoId: string) => Promise<PaymentLogEntry[]>;
  getPaymentStats: () => Promise<PaymentStats>;
  isLoading: boolean;
  error: string | null;
}

export const usePayments = (): UsePaymentsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentLink = useCallback(async (
    planoId: string, 
    paymentType: 'pix' | 'cartao',
    customerEmail?: string
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const requestData: CreatePaymentLinkRequest = {
        planoId,
        paymentType,
        customerEmail
      };
      
      const response = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      const data: CreatePaymentLinkResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro ao criar link de pagamento');
      }
      
      if (!data.paymentUrl) {
        throw new Error('URL de pagamento não retornada');
      }
      
      return data.paymentUrl;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPaymentLogs = useCallback(async (planoId: string): Promise<PaymentLogEntry[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/payments/logs/${planoId}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro ao buscar logs');
      }
      
      return data.logs || [];
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPaymentStats = useCallback(async (): Promise<PaymentStats> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payments/stats');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro ao buscar estatísticas');
      }
      
      return data.stats;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPaymentLink,
    getPaymentLogs,
    getPaymentStats,
    isLoading,
    error
  };
};
