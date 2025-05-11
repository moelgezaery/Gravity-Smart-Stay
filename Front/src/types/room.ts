
export interface Room {
  id: number;
  roomNumber: string;
  status: string;
  description?: string;
  floor: number;
  capacity: number;
  hasBalcony?: boolean;
  hasOceanView?: boolean;
  roomTypeId?: number;
  roomType?: RoomType;
  createdAt: string;
  lastUpdated?: string;
}

export interface RoomType {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  capacity: number;
  features?: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  lastUpdated?: string;
}

export interface RoomCreate {
  roomNumber: string;
  status: string;
  description?: string;
  floor: number;
  capacity: number;
  hasBalcony?: boolean;
  hasOceanView?: boolean;
  roomTypeId: number;
}

export interface RoomUpdate {
  roomNumber?: string;
  status?: string;
  description?: string;
  floor?: number;
  capacity?: number;
  hasBalcony?: boolean;
  hasOceanView?: boolean;
  roomTypeId?: number;
}
