/**
 * Configuração da API e funções utilitárias para comunicação com o backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Interface para resposta padrão da API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  error?: {
    code: string;
    details?: any;
  };
}

/**
 * Interface para planos de saúde
 */
export interface HealthPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  category: 'basic' | 'family' | 'premium';
  maxPeople: number;
  monthlyPrice: number;
}

/**
 * Tipos para sistema de pagamento
 */
export type PaymentMethod = 'PIX' | 'BOLETO' | 'CREDIT_CARD';
export type PaymentStatus = 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'OVERDUE' | 'REFUNDED' | 'RECEIVED_IN_CASH' | 'REFUND_REQUESTED' | 'CHARGEBACK_REQUESTED' | 'CHARGEBACK_DISPUTE' | 'AWAITING_CHARGEBACK_REVERSAL' | 'DUNNING_REQUESTED' | 'DUNNING_RECEIVED' | 'AWAITING_RISK_ANALYSIS';

/**
 * Interface para dados do cliente
 */
export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  mobilePhone?: string;
  cpfCnpj: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  city: string;
  state: string;
}

/**
 * Interface para dados do cartão de crédito
 */
export interface CreditCardData {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

/**
 * Interface para dados de cobrança
 */
export interface ChargeData {
  customer: Customer;
  billingType: PaymentMethod;
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  installmentCount?: number;
  installmentValue?: number;
  discount?: {
    value: number;
    dueDateLimitDays: number;
  };
  interest?: {
    value: number;
  };
  fine?: {
    value: number;
  };
  postalService?: boolean;
  creditCard?: CreditCardData;
  creditCardHolderInfo?: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string;
    phone: string;
    mobilePhone?: string;
  };
}

/**
 * Interface para resposta de cobrança do Asaas
 */
export interface AsaasChargeResponse {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink?: string;
  value: number;
  netValue: number;
  originalValue?: number;
  interestValue?: number;
  description?: string;
  billingType: PaymentMethod;
  status: PaymentStatus;
  dueDate: string;
  originalDueDate: string;
  paymentDate?: string;
  clientPaymentDate?: string;
  installmentNumber?: number;
  invoiceUrl: string;
  invoiceNumber: string;
  externalReference?: string;
  discount?: {
    value: number;
    limitDate?: string;
    dueDateLimitDays: number;
    type: string;
  };
  fine?: {
    value: number;
    type: string;
  };
  interest?: {
    value: number;
    type: string;
  };
  deleted: boolean;
  postalService: boolean;
  anticipated: boolean;
  anticipable: boolean;
  creditDate?: string;
  estimatedCreditDate?: string;
  transactionReceiptUrl?: string;
  nossoNumero?: string;
  bankSlipUrl?: string;
  lastInvoiceViewedDate?: string;
  lastBankSlipViewedDate?: string;
  pixTransaction?: {
    encodedImage: string;
    payload: string;
    expirationDate: string;
  };
}

/**
 * Função genérica para fazer requisições HTTP
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

/**
 * Serviços da API
 */
export const apiService = {
  /**
   * Busca todos os planos de saúde
   */
  getPlans: async (): Promise<ApiResponse<{ plans: HealthPlan[] }>> => {
    return apiRequest<{ plans: HealthPlan[] }>('/api/v1/plans');
  },

  /**
   * Busca um plano específico por ID
   */
  getPlanById: async (id: string): Promise<ApiResponse<{ plan: HealthPlan }>> => {
    return apiRequest<{ plan: HealthPlan }>(`/api/v1/plans/${id}`);
  },

  /**
   * Verifica o status da API
   */
  getHealthCheck: async (): Promise<ApiResponse> => {
    return apiRequest('/api/health');
  },

  // === PAGAMENTOS ===

  /**
   * Cria um pagamento genérico
   */
  createPayment: async (chargeData: ChargeData): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>('/api/v1/payments', {
      method: 'POST',
      body: JSON.stringify(chargeData),
    });
  },

  /**
   * Cria um pagamento via PIX
   */
  createPixPayment: async (chargeData: Omit<ChargeData, 'billingType'>): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>('/api/v1/payments/pix', {
      method: 'POST',
      body: JSON.stringify(chargeData),
    });
  },

  /**
   * Cria um pagamento via boleto
   */
  createBoletoPayment: async (chargeData: Omit<ChargeData, 'billingType'>): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>('/api/v1/payments/boleto', {
      method: 'POST',
      body: JSON.stringify(chargeData),
    });
  },

  /**
   * Cria um pagamento via cartão de crédito
   */
  createCreditCardPayment: async (chargeData: Omit<ChargeData, 'billingType'>): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>('/api/v1/payments/credit-card', {
      method: 'POST',
      body: JSON.stringify(chargeData),
    });
  },
  
  /**
   * Cria um pagamento recorrente (assinatura)
   */
  createRecurringPayment: async (chargeData: ChargeData): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>('/api/v1/payments/recurring', {
      method: 'POST',
      body: JSON.stringify(chargeData),
    });
  },

  /**
   * Consulta o status de um pagamento
   */
  getPaymentStatus: async (paymentId: string): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>(`/api/v1/payments/${paymentId}`);
  },

  /**
   * Lista pagamentos com filtros
   */
  listPayments: async (filters?: {
    customer?: string;
    status?: PaymentStatus;
    dateCreated?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<{ payments: AsaasChargeResponse[]; totalCount: number }>> => {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/api/v1/payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiRequest<{ payments: AsaasChargeResponse[]; totalCount: number }>(endpoint);
  },

  /**
   * Cancela um pagamento
   */
  cancelPayment: async (paymentId: string): Promise<ApiResponse<AsaasChargeResponse>> => {
    return apiRequest<AsaasChargeResponse>(`/api/v1/payments/${paymentId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Busca métodos de pagamento disponíveis
   */
  getPaymentMethods: async (): Promise<ApiResponse<Array<{
    id: string;
    name: string;
    description: string;
    available: boolean;
  }>>> => {
    return apiRequest('/api/v1/payments/methods');
  },

  /**
   * Health check do serviço de pagamentos
   */
  getPaymentHealthCheck: async (): Promise<ApiResponse<{ status: string }>> => {
    return apiRequest<{ status: string }>('/api/v1/payments/health');
  },
};