
export interface RoomType {
  id: number;
  name: string;
  description?: string;
  baseRate: number;
  capacity: number;
  bedCount: number;
  bedType?: string;
  hasBalcony?: boolean;
  hasOceanView?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface RoomTypeCreate {
  name: string;
  description?: string;
  baseRate: number;
  capacity: number;
  bedCount: number;
  bedType?: string;
  hasBalcony?: boolean;
  hasOceanView?: boolean;
}

export interface RoomTypeUpdate {
  name?: string;
  description?: string;
  baseRate?: number;
  capacity?: number;
  bedCount?: number;
  bedType?: string;
  hasBalcony?: boolean;
  hasOceanView?: boolean;
  isActive?: boolean;
}
