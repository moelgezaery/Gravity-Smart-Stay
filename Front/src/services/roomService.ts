
import { roomSupabaseService } from "./roomSupabaseService";
import { Room, RoomCreate, RoomUpdate } from "@/types/room";

export const roomService = {
  getRooms: async (): Promise<Room[]> => {
    return roomSupabaseService.getRooms();
  },

  getRoom: async (id: number): Promise<Room> => {
    return roomSupabaseService.getRoom(id);
  },

  createRoom: async (room: RoomCreate): Promise<Room> => {
    return roomSupabaseService.createRoom(room);
  },

  updateRoom: async (id: number, room: RoomUpdate): Promise<void> => {
    return roomSupabaseService.updateRoom(id, room);
  },

  deleteRoom: async (id: number): Promise<void> => {
    return roomSupabaseService.deleteRoom(id);
  },

  getRoomsByFloor: async (floor: number): Promise<Room[]> => {
    return roomSupabaseService.getRoomsByFloor(floor);
  },

  getRoomsByStatus: async (status: string): Promise<Room[]> => {
    return roomSupabaseService.getRoomsByStatus(status);
  },

  getAvailableRooms: async (): Promise<Room[]> => {
    return roomSupabaseService.getAvailableRooms();
  }
};
