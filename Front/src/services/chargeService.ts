
import { chargeSupabaseService } from "./chargeSupabaseService";
import { Charge, ChargeCreate, ChargeUpdate, ChargeCategory, ChargeStatus } from "@/types/charge";

export const chargeService = {
  getCharges: async (): Promise<Charge[]> => {
    return chargeSupabaseService.getCharges();
  },

  getCharge: async (id: number): Promise<Charge> => {
    return chargeSupabaseService.getCharge(id);
  },

  createCharge: async (charge: ChargeCreate): Promise<Charge> => {
    return chargeSupabaseService.createCharge(charge);
  },

  updateCharge: async (id: number, charge: ChargeUpdate): Promise<void> => {
    return chargeSupabaseService.updateCharge(id, charge);
  },

  deleteCharge: async (id: number): Promise<void> => {
    return chargeSupabaseService.deleteCharge(id);
  },

  getBookingCharges: async (bookingId: number): Promise<Charge[]> => {
    return chargeSupabaseService.getBookingCharges(bookingId);
  },

  getChargesByCategory: async (category: ChargeCategory): Promise<Charge[]> => {
    return chargeSupabaseService.getChargesByCategory(category);
  },

  getUnpaidCharges: async (): Promise<Charge[]> => {
    return chargeSupabaseService.getUnpaidCharges();
  },

  markAsPaid: async (id: number): Promise<void> => {
    return chargeSupabaseService.markAsPaid(id);
  }
};
