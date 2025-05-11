
import { paymentSupabaseService } from "./paymentSupabaseService";
import { Payment, PaymentCreate, PaymentUpdate, PaymentStatus } from "@/types/payment";

export const paymentService = {
  getPayments: async (): Promise<Payment[]> => {
    return paymentSupabaseService.getPayments();
  },

  getPayment: async (id: number): Promise<Payment> => {
    return paymentSupabaseService.getPayment(id);
  },

  createPayment: async (payment: PaymentCreate): Promise<Payment> => {
    return paymentSupabaseService.createPayment(payment);
  },

  updatePayment: async (id: number, payment: PaymentUpdate): Promise<void> => {
    return paymentSupabaseService.updatePayment(id, payment);
  },

  deletePayment: async (id: number): Promise<void> => {
    return paymentSupabaseService.deletePayment(id);
  },

  getBookingPayments: async (bookingId: number): Promise<Payment[]> => {
    return paymentSupabaseService.getBookingPayments(bookingId);
  },

  getPaymentsByStatus: async (status: PaymentStatus): Promise<Payment[]> => {
    return paymentSupabaseService.getPaymentsByStatus(status);
  },

  refundPayment: async (id: number, refundDetails: { amount: number, reason: string }): Promise<void> => {
    return paymentSupabaseService.refundPayment(id, refundDetails);
  }
};
