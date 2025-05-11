
import { supabase } from "@/integrations/supabase/client";

export type ChargeCategory = 'RoomRate' | 'Food' | 'Beverage' | 'Service' | 'Tax' | 'Other';
export type ChargeStatus = 'Pending' | 'Paid' | 'Cancelled' | 'Refunded';

export interface Charge {
  id: number;
  bookingId: number;
  booking?: any;
  category: ChargeCategory;
  description: string;
  amount: number;
  status: ChargeStatus;
  date: string;
  notes?: string;
  createdAt: string;
  lastUpdated?: string;
}

export interface ChargeCreate {
  bookingId: number;
  category: ChargeCategory;
  description: string;
  amount: number;
  status?: ChargeStatus;
  date?: string;
  notes?: string;
}

export interface ChargeUpdate {
  category?: ChargeCategory;
  description?: string;
  amount?: number;
  status?: ChargeStatus;
  notes?: string;
}

const mapToSupabase = (charge: ChargeCreate | ChargeUpdate) => {
  const mappedData: any = {};
  
  if ('bookingId' in charge) mappedData.booking_id = charge.bookingId;
  if ('category' in charge) mappedData.category = charge.category;
  if ('description' in charge) mappedData.description = charge.description;
  if ('amount' in charge) mappedData.amount = charge.amount;
  if ('status' in charge) mappedData.status = charge.status;
  if ('date' in charge) mappedData.date = charge.date || new Date().toISOString();
  if ('notes' in charge) mappedData.notes = charge.notes;
  
  return mappedData;
};

const mapFromSupabase = (data: any): Charge => {
  return {
    id: data.id,
    bookingId: data.booking_id,
    booking: data.bookings,
    category: data.category as ChargeCategory,
    description: data.description,
    amount: data.amount,
    status: data.status as ChargeStatus,
    date: data.date,
    notes: data.notes,
    createdAt: data.created_at,
    lastUpdated: data.last_updated
  };
};

export const chargeSupabaseService = {
  async getCharges(): Promise<Charge[]> {
    const { data, error } = await supabase
      .from('charges')
      .select('*, bookings(*)');
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getCharge(id: number): Promise<Charge> {
    const { data, error } = await supabase
      .from('charges')
      .select('*, bookings(*)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async createCharge(charge: ChargeCreate): Promise<Charge> {
    const { data, error } = await supabase
      .from('charges')
      .insert(mapToSupabase(charge))
      .select('*, bookings(*)')
      .single();
      
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async updateCharge(id: number, charge: ChargeUpdate): Promise<void> {
    const { error } = await supabase
      .from('charges')
      .update(mapToSupabase(charge))
      .eq('id', id);
      
    if (error) throw error;
  },

  async deleteCharge(id: number): Promise<void> {
    const { error } = await supabase
      .from('charges')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  },

  async getBookingCharges(bookingId: number): Promise<Charge[]> {
    const { data, error } = await supabase
      .from('charges')
      .select('*, bookings(*)')
      .eq('booking_id', bookingId);
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getChargesByCategory(category: ChargeCategory): Promise<Charge[]> {
    const { data, error } = await supabase
      .from('charges')
      .select('*, bookings(*)')
      .eq('category', category);
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getUnpaidCharges(): Promise<Charge[]> {
    const { data, error } = await supabase
      .from('charges')
      .select('*, bookings(*)')
      .eq('status', 'Pending');
      
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async markAsPaid(id: number): Promise<void> {
    const { error } = await supabase
      .from('charges')
      .update({ status: 'Paid' })
      .eq('id', id);
      
    if (error) throw error;
  }
};
