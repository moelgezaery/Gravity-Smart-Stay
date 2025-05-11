
import { bookingSupabaseService } from "./bookingSupabaseService";
import { Booking, BookingCreate, BookingUpdate, BookingStatus } from "@/types/booking";

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    return bookingSupabaseService.getBookings();
  },

  getBooking: async (id: number): Promise<Booking> => {
    return bookingSupabaseService.getBooking(id);
  },

  createBooking: async (booking: BookingCreate): Promise<Booking> => {
    return bookingSupabaseService.createBooking(booking);
  },

  updateBooking: async (id: number, booking: BookingUpdate): Promise<void> => {
    return bookingSupabaseService.updateBooking(id, booking);
  },

  deleteBooking: async (id: number): Promise<void> => {
    return bookingSupabaseService.deleteBooking(id);
  },

  getGuestBookings: async (guestId: number): Promise<Booking[]> => {
    return bookingSupabaseService.getGuestBookings(guestId);
  },

  getBookingsByStatus: async (status: BookingStatus): Promise<Booking[]> => {
    return bookingSupabaseService.getBookingsByStatus(status);
  },

  getActiveBookings: async (): Promise<Booking[]> => {
    return bookingSupabaseService.getActiveBookings();
  },

  getArrivalsForToday: async (): Promise<Booking[]> => {
    return bookingSupabaseService.getArrivalsForToday();
  },

  getDeparturesForToday: async (): Promise<Booking[]> => {
    return bookingSupabaseService.getDeparturesForToday();
  },
  
  checkIn: async (id: number): Promise<void> => {
    return bookingSupabaseService.updateBooking(id, { status: 'CheckedIn' });
  },
  
  checkOut: async (id: number): Promise<void> => {
    return bookingSupabaseService.updateBooking(id, { status: 'CheckedOut' });
  }
};
