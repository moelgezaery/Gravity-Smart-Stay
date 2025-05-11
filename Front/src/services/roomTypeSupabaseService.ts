import { supabase } from "@/integrations/supabase/client";
import { RoomType, RoomTypeCreate, RoomTypeUpdate } from "@/types/roomType";
export const roomTypeSupabaseService = {
  async getRoomTypes(): Promise<RoomType[]> {
    const { data, error } = await supabase
      .from('room_types')
      .select('*');

    if (error) {
      throw error;
    }

    return data.map(roomType => ({
      id: roomType.id,
      name: roomType.name,
      description: roomType.description || '',
      baseRate: roomType.base_rate,
      capacity: roomType.max_occupancy,
      bedCount: roomType.bed_count,
      bedType: roomType.bed_type || '',
      hasBalcony: roomType.has_balcony || false,
      hasOceanView: roomType.has_ocean_view || false,
      isActive: roomType.is_active || true,
      createdAt: roomType.created_at,
      updatedAt: roomType.updated_at || '',
    }));
  },

  async getRoomType(id: number): Promise<RoomType | null> {
    const { data, error } = await supabase
      .from('room_types')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      baseRate: data.base_rate,
      capacity: data.max_occupancy,
      bedCount: data.bed_count,
      bedType: data.bed_type || '',
      hasBalcony: data.has_balcony || false,
      hasOceanView: data.has_ocean_view || false,
      isActive: data.is_active || true,
      createdAt: data.created_at,
      updatedAt: data.updated_at || '',
    };
  },

  async createRoomType(roomType: RoomTypeCreate): Promise<RoomType> {
    const { data, error } = await supabase
      .from('room_types')
      .insert({
        name: roomType.name,
        description: roomType.description,
        base_rate: roomType.baseRate,
        max_occupancy: roomType.capacity,
        bed_count: roomType.bedCount,
        bed_type: roomType.bedType,
        has_balcony: roomType.hasBalcony,
        has_ocean_view: roomType.hasOceanView,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      baseRate: data.base_rate,
      capacity: data.max_occupancy,
      bedCount: data.bed_count,
      bedType: data.bed_type || '',
      hasBalcony: data.has_balcony || false,
      hasOceanView: data.has_ocean_view || false,
      isActive: data.is_active || true,
      createdAt: data.created_at,
      updatedAt: data.updated_at || '',
    };
  },

  async updateRoomType(id: number, roomType: RoomTypeUpdate): Promise<void> {
    const updates: { [key: string]: any } = {};

    if (roomType.name !== undefined) {
      updates.name = roomType.name;
    }
    if (roomType.description !== undefined) {
      updates.description = roomType.description;
    }
    if (roomType.baseRate !== undefined) {
      updates.base_rate = roomType.baseRate;
    }
    if (roomType.capacity !== undefined) {
      updates.max_occupancy = roomType.capacity;
    }
     if (roomType.bedCount !== undefined) {
      updates.bed_count = roomType.bedCount;
    }
    if (roomType.bedType !== undefined) {
      updates.bed_type = roomType.bedType;
    }
    if (roomType.hasBalcony !== undefined) {
      updates.has_balcony = roomType.hasBalcony;
    }
    if (roomType.hasOceanView !== undefined) {
      updates.has_ocean_view = roomType.hasOceanView;
    }
    if (roomType.isActive !== undefined) {
      updates.is_active = roomType.isActive;
    }

    const { error } = await supabase
      .from('room_types')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }
  },

  async deleteRoomType(id: number): Promise<void> {
    const { error } = await supabase
      .from('room_types')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  },
};
