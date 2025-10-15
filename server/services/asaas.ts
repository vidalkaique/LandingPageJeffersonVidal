// ============================================
// SERVICE: Asaas API Integration
// DESCRIÇÃO: Serviço para integração com API Asaas
// ============================================

import type {
  AsaasPaymentLinkRequest,
  AsaasPaymentLinkResponse,
  AsaasErrorResponse
} from '../../shared/asaas-types';
import { ASAAS_CONFIG, BILLING_TYPES } from '../../shared/asaas-types';

export class AsaasService {
  private static readonly API_KEY = process.env.ASAAS_API_KEY;
  private static readonly BASE_URL = process.env.NODE_ENV === 'production' 
    ? ASAAS_CONFIG.BASE_URL 
    : ASAAS_CONFIG.SANDBOX_URL;

  private static validateApiKey(): void {
    if (!this.API_KEY) {
      throw new Error('ASAAS_API_KEY não configurada nas variáveis de ambiente');
    }
  }

  private static getHeaders(): HeadersInit {
    this.validateApiKey();
    return {
      'access_token': this.API_KEY!,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
      const errorData = data as AsaasErrorResponse;
      const errorMessage = errorData.errors?.map(e => e.description).join(', ') || 'Erro desconhecido';
      throw new Error(`Erro Asaas (${response.status}): ${errorMessage}`);
    }
    
    return data;
  }

  static async createPaymentLink(
    planName: string,
    planValue: number,
    paymentType: 'pix' | 'cartao',
    externalReference?: string
  ): Promise<AsaasPaymentLinkResponse> {
    try {
      const billingType = paymentType === 'pix' ? BILLING_TYPES.PIX : BILLING_TYPES.CREDIT_CARD;
      
      const requestData: AsaasPaymentLinkRequest = {
        name: `${planName} - Jefferson Personal`,
        description: `Pagamento via ${paymentType.toUpperCase()} - Treino personalizado`,
        value: planValue,
        billingType,
        chargeType: 'DETACHED',
        callback: {
          successUrl: ASAAS_CONFIG.SUCCESS_REDIRECT_URL,
          autoRedirect: true
        },
        externalReference,
        notificationEnabled: true
      };

      // Configurações específicas por tipo de pagamento
      if (paymentType === 'cartao') {
        requestData.maxInstallmentCount = 12; // Até 12x no cartão
      }

      const response = await fetch(
        `${this.BASE_URL}${ASAAS_CONFIG.ENDPOINTS.PAYMENT_LINKS}`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(requestData)
        }
      );

      return await this.handleResponse<AsaasPaymentLinkResponse>(response);
    } catch (error) {
      console.error('Erro ao criar link de pagamento:', error);
      throw error;
    }
  }

  static async getPaymentLink(linkId: string): Promise<AsaasPaymentLinkResponse> {
    try {
      const response = await fetch(
        `${this.BASE_URL}${ASAAS_CONFIG.ENDPOINTS.PAYMENT_LINKS}/${linkId}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      return await this.handleResponse<AsaasPaymentLinkResponse>(response);
    } catch (error) {
      console.error('Erro ao buscar link de pagamento:', error);
      throw error;
    }
  }

  static async deletePaymentLink(linkId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.BASE_URL}${ASAAS_CONFIG.ENDPOINTS.PAYMENT_LINKS}/${linkId}`,
        {
          method: 'DELETE',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao deletar link: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao deletar link de pagamento:', error);
      throw error;
    }
  }

  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  static generateExternalReference(planoId: string, paymentType: string): string {
    const timestamp = Date.now();
    return `${planoId}_${paymentType}_${timestamp}`;
  }
}
