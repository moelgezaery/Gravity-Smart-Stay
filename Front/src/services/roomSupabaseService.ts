
import { supabase } from "@/integrations/supabase/client";
import { Room, RoomCreate, RoomUpdate } from "@/types/room";

// Convert from our app types to Supabase database types
const mapToSupabase = (room: RoomCreate | RoomUpdate) => {
  return {
    room_number: room.roomNumber,
    status: room.status,
    description: room.description,
    floor: room.floor,
    capacity: room.capacity,
    has_balcony: room.hasBalcony,
    has_ocean_view: room.hasOceanView,
    room_type_id: room.roomTypeId
  };
};

// Convert from Supabase database types to our app types
const mapFromSupabase = (data: any): Room => {
  return {
    id: data.id,
    roomNumber: data.room_number,
    status: data.status,
    description: data.description,
    floor: data.floor,
    capacity: data.capacity,
    hasBalcony: data.has_balcony,
    hasOceanView: data.has_ocean_view,
    roomTypeId: data.room_type_id,
    roomType: data.room_type ? {
      id: data.room_type.id,
      name: data.room_type.name,
      description: data.room_type.description,
      basePrice: data.room_type.base_rate,
      capacity: data.room_type.max_occupancy,
      features: data.room_type.features,
      imageUrl: data.room_type.image_url,
      isActive: data.room_type.is_active,
      createdAt: data.room_type.created_at,
      lastUpdated: data.room_type.updated_at
    } : undefined,
    createdAt: data.created_at,
    lastUpdated: data.last_updated
  };
};

export const roomSupabaseService = {
  async getRooms(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_type:room_types(*)');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getRoom(id: number): Promise<Room> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_type:room_types(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async createRoom(room: RoomCreate): Promise<Room> {
    const { data, error } = await supabase
      .from('rooms')
      .insert(mapToSupabase(room))
      .select('*, room_type:room_types(*)')
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async updateRoom(id: number, room: RoomUpdate): Promise<void> {
    const { error } = await supabase
      .from('rooms')
      .update(mapToSupabase(room))
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteRoom(id: number): Promise<void> {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getRoomsByFloor(floor: number): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_type:room_types(*)')
      .eq('floor', floor);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getRoomsByStatus(status: string): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_type:room_types(*)')
      .eq('status', status);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getAvailableRooms(): Promise<Room[]> {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_type:room_types(*)')
      .eq('status', 'vacant');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  }
};
