import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingCreate, BookingUpdate, BookingStatus, PaymentStatus } from "@/types/booking";

// Convert from our app types to Supabase database types
const mapToSupabase = (booking: BookingCreate | BookingUpdate) => {
  const mappedData: any = {};
  
  if ('guestId' in booking) mappedData.guest_id = booking.guestId;
  if ('roomId' in booking) mappedData.room_id = booking.roomId;
  if ('checkInDate' in booking) mappedData.check_in_date = booking.checkInDate;
  if ('checkOutDate' in booking) mappedData.check_out_date = booking.checkOutDate;
  if ('specialRequests' in booking) mappedData.special_requests = booking.specialRequests;
  if ('numberOfGuests' in booking) mappedData.number_of_guests = booking.numberOfGuests;
  if ('status' in booking) mappedData.status = booking.status;
  if ('paymentStatus' in booking) mappedData.payment_status = booking.paymentStatus;
  if ('totalAmount' in booking) mappedData.total_amount = booking.totalAmount;

  return mappedData;
};

// Convert from Supabase database types to our app types
const mapFromSupabase = (data: any): Booking => {
  return {
    id: data.id,
    guestId: data.guest_id,
    roomId: data.room_id,
    checkInDate: data.check_in_date,
    checkOutDate: data.check_out_date,
    status: data.status as BookingStatus,
    totalAmount: data.total_amount,
    specialRequests: data.special_requests,
    numberOfGuests: data.number_of_guests,
    paymentStatus: data.payment_status as PaymentStatus,
    createdAt: data.created_at,
    lastUpdated: data.last_updated,
    guest: data.guest ? {
      id: data.guest.id,
      firstName: data.guest.first_name,
      lastName: data.guest.last_name,
      email: data.guest.email,
      phoneNumber: data.guest.phone_number,
      address: data.guest.address,
      city: data.guest.city,
      country: data.guest.country,
      passportNumber: data.guest.passport_number,
      dateOfBirth: data.guest.date_of_birth,
      specialRequests: data.guest.special_requests,
      createdAt: data.guest.created_at,
      lastUpdated: data.guest.last_updated
    } : undefined,
    room: data.room ? {
      id: data.room.id,
      roomNumber: data.room.room_number,
      status: data.room.status,
      description: data.room.description,
      floor: data.room.floor,
      capacity: data.room.capacity,
      hasBalcony: data.room.has_balcony,
      hasOceanView: data.room.has_ocean_view,
      roomTypeId: data.room.room_type_id,
      createdAt: data.room.created_at,
      lastUpdated: data.room.last_updated
    } : undefined,
    charges: data.charges || [],
    payments: data.payments || []
  };
};

export const bookingSupabaseService = {
  async getBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getBooking(id: number): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async createBooking(booking: BookingCreate): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert(mapToSupabase(booking))
      .select('*, guest:guests(*), room:rooms(*)')
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async updateBooking(id: number, booking: BookingUpdate): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update(mapToSupabase(booking))
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteBooking(id: number): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getGuestBookings(guestId: number): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)')
      .eq('guest_id', guestId);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getBookingsByStatus(status: BookingStatus): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)')
      .eq('status', status);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getActiveBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)')
      .in('status', ['Confirmed', 'CheckedIn']);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getArrivalsForToday(): Promise<Booking[]> {
    // Get today's date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)')
      .eq('status', 'Confirmed')
      .gte('check_in_date', today + 'T00:00:00')
      .lte('check_in_date', today + 'T23:59:59');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getDeparturesForToday(): Promise<Booking[]> {
    // Get today's date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), room:rooms(*)')
      .eq('status', 'CheckedIn')
      .gte('check_out_date', today + 'T00:00:00')
      .lte('check_out_date', today + 'T23:59:59');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  }
};
