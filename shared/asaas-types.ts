// ============================================
// TYPES: Asaas API Integration
// DESCRIÇÃO: Tipos TypeScript para integração com API Asaas
// ============================================

export interface AsaasPaymentLinkRequest {
  name: string;
  description?: string;
  value: number;
  billingType: 'PIX' | 'CREDIT_CARD' | 'UNDEFINED';
  chargeType: 'DETACHED' | 'RECURRENT' | 'INSTALLMENT';
  callback: {
    successUrl: string;
    autoRedirect: boolean;
  };
  externalReference?: string;
  notificationEnabled?: boolean;
  dueDateLimitDays?: number;
  maxInstallmentCount?: number;
}

export interface AsaasPaymentLinkResponse {
  id: string;
  name: string;
  value: number;
  active: boolean;
  chargeType: string;
  url: string;
  billingType: string;
  description?: string;
  endDate?: string;
  deleted: boolean;
  viewCount: number;
  maxInstallmentCount?: number;
  dueDateLimitDays?: number;
  notificationEnabled: boolean;
  externalReference?: string;
}

export interface AsaasErrorResponse {
  errors: Array<{
    code: string;
    description: string;
  }>;
}

export interface CreatePaymentLinkRequest {
  planoId: string;
  paymentType: 'pix' | 'cartao';
  customerEmail?: string;
}

export interface CreatePaymentLinkResponse {
  success: boolean;
  paymentUrl?: string;
  error?: string;
  logId?: string;
}

export interface PaymentLogEntry {
  id: string;
  plano_id: string;
  payment_type: 'pix' | 'cartao';
  asaas_link_id: string;
  asaas_link_url: string;
  customer_email?: string;
  amount: number;
  status: 'created' | 'paid' | 'failed' | 'expired';
  external_reference?: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentStats {
  total_links_created: number;
  total_paid: number;
  total_pending: number;
  total_failed: number;
  revenue_pix: number;
  revenue_cartao: number;
  last_30_days: number;
}

// Constantes
export const ASAAS_CONFIG = {
  BASE_URL: 'https://api.asaas.com/v3',
  SANDBOX_URL: 'https://api-sandbox.asaas.com/v3',
  SUCCESS_REDIRECT_URL: 'https://obrigado-pela-compra-two.vercel.app/',
  ENDPOINTS: {
    PAYMENT_LINKS: '/paymentLinks'
  }
} as const;

export const PAYMENT_TYPES = {
  PIX: 'pix',
  CARTAO: 'cartao'
} as const;

export const BILLING_TYPES = {
  PIX: 'PIX',
  CREDIT_CARD: 'CREDIT_CARD',
  UNDEFINED: 'UNDEFINED'
} as const;
