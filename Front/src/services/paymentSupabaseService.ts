
import { supabase } from "@/integrations/supabase/client";
import { Payment, PaymentCreate, PaymentUpdate, PaymentStatus, PaymentMethod } from "@/types/payment";

// Mock payments data for development
const mockPayments: Payment[] = [
  {
    id: 1,
    bookingId: 101,
    amount: 240.50,
    paymentMethod: 'CreditCard',
    status: 'Completed',
    transactionId: 'TX123456',
    paymentDate: '2025-05-04T12:00:00Z',
    createdAt: '2025-05-04T12:00:00Z',
  },
  {
    id: 2,
    bookingId: 102,
    amount: 540.75,
    paymentMethod: 'Cash',
    status: 'Completed',
    paymentDate: '2025-05-03T14:30:00Z',
    createdAt: '2025-05-03T14:30:00Z',
  },
  {
    id: 3,
    bookingId: 103,
    amount: 320.25,
    paymentMethod: 'BankTransfer',
    status: 'Pending',
    paymentDate: '2025-05-02T09:15:00Z',
    createdAt: '2025-05-02T09:15:00Z',
  }
];

const mapToSupabase = (payment: PaymentCreate | PaymentUpdate) => {
  const mappedData: any = {};
  
  if ('bookingId' in payment) mappedData.booking_id = payment.bookingId;
  if ('amount' in payment) mappedData.amount = payment.amount;
  if ('paymentMethod' in payment) mappedData.payment_method = payment.paymentMethod;
  if ('status' in payment) mappedData.status = payment.status;
  if ('transactionId' in payment) mappedData.transaction_id = payment.transactionId;
  if ('paymentDate' in payment) mappedData.payment_date = payment.paymentDate || new Date().toISOString();
  if ('notes' in payment) mappedData.notes = payment.notes;
  if ('refundAmount' in payment) mappedData.refund_amount = payment.refundAmount;
  if ('refundDate' in payment) mappedData.refund_date = payment.refundDate;
  if ('refundReason' in payment) mappedData.refund_reason = payment.refundReason;
  if ('processedById' in payment) mappedData.processed_by_id = payment.processedById;
  
  return mappedData;
};

const mapFromSupabase = (data: any): Payment => {
  return {
    id: data.id,
    bookingId: data.booking_id,
    booking: data.booking,
    amount: data.amount,
    paymentMethod: data.payment_method as PaymentMethod,
    status: data.status as PaymentStatus,
    transactionId: data.transaction_id,
    paymentDate: data.payment_date,
    notes: data.notes,
    refundAmount: data.refund_amount,
    refundDate: data.refund_date,
    refundReason: data.refund_reason,
    createdAt: data.created_at,
    processedById: data.processed_by_id,
    processedBy: data.processed_by
  };
};

export const paymentSupabaseService = {
  async getPayments(): Promise<Payment[]> {
    // Using mock data for development
    return Promise.resolve([...mockPayments]);
    
    // Uncomment when ready to use with Supabase
    /*
    const { data, error } = await supabase
      .from('payments')
      .select('*');
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
    */
  },

  async getPayment(id: number): Promise<Payment> {
    // Using mock data for development
    const payment = mockPayments.find(p => p.id === id);
    if (!payment) throw new Error('Payment not found');
    return Promise.resolve({...payment});
    
    // Uncomment when ready to use with Supabase
    /*
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return mapFromSupabase(data);
    */
  },

  async createPayment(payment: PaymentCreate): Promise<Payment> {
    // Using mock data for development
    const newPayment: Payment = {
      id: mockPayments.length + 1,
      bookingId: payment.bookingId,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      status: payment.status || 'Pending',
      transactionId: payment.transactionId,
      paymentDate: payment.paymentDate || new Date().toISOString(),
      notes: payment.notes,
      createdAt: new Date().toISOString(),
      processedById: payment.processedById
    };
    
    mockPayments.push(newPayment);
    return Promise.resolve({...newPayment});
    
    // Uncomment when ready to use with Supabase
    /*
    const { data, error } = await supabase
      .from('payments')
      .insert(mapToSupabase(payment))
      .select()
      .single();
      
    if (error) throw error;
    
    return mapFromSupabase(data);
    */
  },

  async updatePayment(id: number, payment: PaymentUpdate): Promise<void> {
    // Using mock data for development
    const index = mockPayments.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Payment not found');
    
    mockPayments[index] = { ...mockPayments[index], ...payment };
    return Promise.resolve();
    
    // Uncomment when ready to use with Supabase
    /*
    const { error } = await supabase
      .from('payments')
      .update(mapToSupabase(payment))
      .eq('id', id);
      
    if (error) throw error;
    */
  },

  async deletePayment(id: number): Promise<void> {
    // Using mock data for development
    const index = mockPayments.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Payment not found');
    
    mockPayments.splice(index, 1);
    return Promise.resolve();
    
    // Uncomment when ready to use with Supabase
    /*
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    */
  },

  async getBookingPayments(bookingId: number): Promise<Payment[]> {
    // Using mock data for development
    const payments = mockPayments.filter(p => p.bookingId === bookingId);
    return Promise.resolve([...payments]);
    
    // Uncomment when ready to use with Supabase
    /*
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId);
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
    */
  },

  async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
    // Using mock data for development
    const payments = mockPayments.filter(p => p.status === status);
    return Promise.resolve([...payments]);
    
    // Uncomment when ready to use with Supabase
    /*
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('status', status);
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
    */
  },
  
  async refundPayment(id: number, refundDetails: { amount: number, reason: string }): Promise<void> {
    // Using mock data for development
    const index = mockPayments.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Payment not found');
    
    // Check if payment can be refunded
    if (mockPayments[index].status !== 'Completed') {
      throw new Error('Only completed payments can be refunded');
    }
    
    mockPayments[index] = {
      ...mockPayments[index],
      status: 'Refunded',
      refundAmount: refundDetails.amount,
      refundDate: new Date().toISOString(),
      refundReason: refundDetails.reason
    };
    
    return Promise.resolve();
    
    // Uncomment when ready to use with Supabase
    /*
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Check if payment can be refunded
    if (payment.status !== 'Completed') {
      throw new Error('Only completed payments can be refunded');
    }
    
    const { error } = await supabase
      .from('payments')
      .update({
        status: 'Refunded',
        refund_amount: refundDetails.amount,
        refund_date: new Date().toISOString(),
        refund_reason: refundDetails.reason
      })
      .eq('id', id);
      
    if (error) throw error;
    */
  }
};
