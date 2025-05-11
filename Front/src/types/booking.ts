
export type BookingStatus = 'Pending' | 'Confirmed' | 'CheckedIn' | 'CheckedOut' | 'Cancelled' | 'NoShow';
export type PaymentStatus = 'Pending' | 'Partial' | 'Paid' | 'Refunded' | 'Failed';

export interface Booking {
  id: number;
  guestId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  totalAmount: number;
  numberOfGuests?: number;
  specialRequests?: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  lastUpdated?: string;
  guest?: any;
  room?: any;
  charges?: any[];
  payments?: any[];
}

export interface BookingCreate {
  guestId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status?: BookingStatus;
  totalAmount: number;
  numberOfGuests?: number;
  specialRequests?: string;
  paymentStatus?: PaymentStatus;
}

export interface BookingUpdate {
  guestId?: number;
  roomId?: number;
  checkInDate?: string;
  checkOutDate?: string;
  status?: BookingStatus;
  totalAmount?: number;
  numberOfGuests?: number;
  specialRequests?: string;
  paymentStatus?: PaymentStatus;
}
