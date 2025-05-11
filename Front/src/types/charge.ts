
export type ChargeCategory = 'RoomRate' | 'Food' | 'Beverage' | 'Service' | 'Tax' | 'Other';
export type ChargeStatus = 'Pending' | 'Paid' | 'Cancelled' | 'Refunded';

export interface Charge {
  id: number;
  bookingId: number;
  booking?: any;
  category: ChargeCategory;
  description: string;
  amount: number;
  status: ChargeStatus;
  date: string;
  notes?: string;
  createdAt: string;
  lastUpdated?: string;
}

export interface ChargeCreate {
  bookingId: number;
  category: ChargeCategory;
  description: string;
  amount: number;
  status?: ChargeStatus;
  date?: string;
  notes?: string;
}

export interface ChargeUpdate {
  category?: ChargeCategory;
  description?: string;
  amount?: number;
  status?: ChargeStatus;
  notes?: string;
}
