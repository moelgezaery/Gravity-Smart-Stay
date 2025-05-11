
import { supabase } from "@/integrations/supabase/client";
import { Guest, GuestCreate, GuestUpdate } from "@/types/guest";

// Convert from our app types to Supabase database types
const mapToSupabase = (guest: GuestCreate | GuestUpdate) => {
  return {
    first_name: guest.firstName,
    last_name: guest.lastName,
    email: guest.email,
    phone_number: guest.phoneNumber,
    address: guest.address,
    city: guest.city,
    country: guest.country,
    passport_number: guest.passportNumber,
    date_of_birth: guest.dateOfBirth,
    special_requests: guest.specialRequests
  };
};

// Convert from Supabase database types to our app types
const mapFromSupabase = (data: any): Guest => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phoneNumber: data.phone_number,
    address: data.address,
    city: data.city,
    country: data.country,
    passportNumber: data.passport_number,
    dateOfBirth: data.date_of_birth,
    specialRequests: data.special_requests,
    createdAt: data.created_at,
    lastUpdated: data.last_updated,
    bookings: data.bookings || []
  };
};

export const guestSupabaseService = {
  async getGuests(): Promise<Guest[]> {
    const { data, error } = await supabase
      .from('guests')
      .select('*');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getGuest(id: number): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async createGuest(guest: GuestCreate): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .insert(mapToSupabase(guest))
      .select()
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async updateGuest(id: number, guest: GuestUpdate): Promise<void> {
    const { error } = await supabase
      .from('guests')
      .update(mapToSupabase(guest))
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteGuest(id: number): Promise<void> {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async searchGuests(query: string): Promise<Guest[]> {
    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getGuestWithBookings(id: number): Promise<Guest> {
    const { data, error } = await supabase
      .from('guests')
      .select('*, bookings(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  }
};
