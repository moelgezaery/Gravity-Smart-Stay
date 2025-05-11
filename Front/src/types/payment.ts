
export type PaymentMethod = 'Cash' | 'CreditCard' | 'BankTransfer' | 'PayPal' | 'Other';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Refunded';

export interface Payment {
  id: number;
  bookingId: number;
  booking?: any;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paymentDate: string;
  notes?: string;
  refundAmount?: number;
  refundDate?: string;
  refundReason?: string;
  createdAt: string;
  processedById?: number;
  processedBy?: any;
}

export interface PaymentCreate {
  bookingId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  status?: PaymentStatus;
  transactionId?: string;
  paymentDate?: string;
  notes?: string;
  processedById?: number;
}

export interface PaymentUpdate {
  status?: PaymentStatus;
  notes?: string;
  refundAmount?: number;
  refundDate?: string;
  refundReason?: string;
}
