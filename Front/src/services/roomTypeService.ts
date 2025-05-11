
import { roomTypeSupabaseService } from "./roomTypeSupabaseService";
import { RoomType, RoomTypeCreate, RoomTypeUpdate } from "@/types/roomType";

export const roomTypeService = {
  getRoomTypes: async (): Promise<RoomType[]> => {
    return roomTypeSupabaseService.getRoomTypes();
  },

  getRoomType: async (id: number): Promise<RoomType | null> => {
    return roomTypeSupabaseService.getRoomType(id);
  },

  createRoomType: async (roomType: RoomTypeCreate): Promise<RoomType> => {
    return roomTypeSupabaseService.createRoomType(roomType);
  },

  updateRoomType: async (id: number, roomType: RoomTypeUpdate): Promise<void> => {
    return roomTypeSupabaseService.updateRoomType(id, roomType);
  },

  deleteRoomType: async (id: number): Promise<void> => {
    return roomTypeSupabaseService.deleteRoomType(id);
  },

  getActiveRoomTypes: async (): Promise<RoomType[]> => {
    const roomTypes = await roomTypeSupabaseService.getRoomTypes();
    return roomTypes.filter(roomType => roomType.isActive);
  }
};
