
import { guestSupabaseService } from "./guestSupabaseService";
import { Guest, GuestCreate, GuestUpdate } from "@/types/guest";

export const guestService = {
  getGuests: async (): Promise<Guest[]> => {
    return guestSupabaseService.getGuests();
  },

  getGuest: async (id: number): Promise<Guest> => {
    return guestSupabaseService.getGuest(id);
  },

  createGuest: async (guest: GuestCreate): Promise<Guest> => {
    return guestSupabaseService.createGuest(guest);
  },

  updateGuest: async (id: number, guest: GuestUpdate): Promise<void> => {
    return guestSupabaseService.updateGuest(id, guest);
  },

  deleteGuest: async (id: number): Promise<void> => {
    return guestSupabaseService.deleteGuest(id);
  },

  searchGuests: async (query: string): Promise<Guest[]> => {
    return guestSupabaseService.searchGuests(query);
  },

  getGuestWithBookings: async (id: number): Promise<Guest> => {
    return guestSupabaseService.getGuestWithBookings(id);
  }
};
