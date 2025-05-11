
export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  specialRequests?: string;
  createdAt: string;
  lastUpdated?: string;
  bookings?: any[];
}

export interface GuestCreate {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  specialRequests?: string;
}

export interface GuestUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  specialRequests?: string;
}
