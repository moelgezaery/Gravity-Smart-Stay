
// Room Types
export type RoomType = "Single" | "Double" | "Suite" | "Deluxe";

// Room Status
export type RoomStatus = "Available" | "Occupied" | "Cleaning" | "Maintenance";

// Guest Information
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: number;
}

// Room Information
export interface Room {
  id: number;
  number: number;
  type: RoomType;
  status: RoomStatus;
  price: number;
  floor: number;
  capacity: number;
  currentGuest?: string;
}

// Booking Information
export interface Booking {
  id: string;
  guestName: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Checked In" | "Checked Out" | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Failed";
  totalAmount: number;
}

// Mock Rooms Data
export const rooms: Room[] = [
  { id: 1, number: 101, type: "Single", status: "Available", price: 99, floor: 1, capacity: 1 },
  { id: 2, number: 102, type: "Double", status: "Occupied", price: 149, floor: 1, capacity: 2, currentGuest: "John Smith" },
  { id: 3, number: 103, type: "Single", status: "Cleaning", price: 99, floor: 1, capacity: 1 },
  { id: 4, number: 104, type: "Suite", status: "Occupied", price: 299, floor: 1, capacity: 4, currentGuest: "Emily Johnson" },
  { id: 5, number: 105, type: "Deluxe", status: "Available", price: 199, floor: 1, capacity: 2 },
  { id: 6, number: 201, type: "Single", status: "Occupied", price: 99, floor: 2, capacity: 1, currentGuest: "Michael Brown" },
  { id: 7, number: 202, type: "Double", status: "Available", price: 149, floor: 2, capacity: 2 },
  { id: 8, number: 203, type: "Suite", status: "Maintenance", price: 299, floor: 2, capacity: 4 },
  { id: 9, number: 204, type: "Single", status: "Available", price: 99, floor: 2, capacity: 1 },
  { id: 10, number: 205, type: "Deluxe", status: "Occupied", price: 199, floor: 2, capacity: 2, currentGuest: "Sarah Wilson" },
  { id: 11, number: 301, type: "Suite", status: "Available", price: 299, floor: 3, capacity: 4 },
  { id: 12, number: 302, type: "Deluxe", status: "Occupied", price: 199, floor: 3, capacity: 2, currentGuest: "David Taylor" },
];

// Mock Bookings Data
export const bookings: Booking[] = [
  {
    id: "B001",
    guestName: "John Smith",
    roomNumber: 102,
    checkIn: "2025-05-04",
    checkOut: "2025-05-07",
    status: "Checked In",
    paymentStatus: "Paid",
    totalAmount: 447
  },
  {
    id: "B002",
    guestName: "Emily Johnson",
    roomNumber: 104,
    checkIn: "2025-05-03",
    checkOut: "2025-05-08",
    status: "Checked In",
    paymentStatus: "Paid",
    totalAmount: 1495
  },
  {
    id: "B003",
    guestName: "Michael Brown",
    roomNumber: 201,
    checkIn: "2025-05-05",
    checkOut: "2025-05-06",
    status: "Checked In",
    paymentStatus: "Paid",
    totalAmount: 99
  },
  {
    id: "B004",
    guestName: "Sarah Wilson",
    roomNumber: 205,
    checkIn: "2025-05-02",
    checkOut: "2025-05-09",
    status: "Checked In",
    paymentStatus: "Paid",
    totalAmount: 1393
  },
  {
    id: "B005",
    guestName: "David Taylor",
    roomNumber: 302,
    checkIn: "2025-05-01",
    checkOut: "2025-05-10",
    status: "Checked In",
    paymentStatus: "Paid",
    totalAmount: 1791
  },
  {
    id: "B006",
    guestName: "James Anderson",
    roomNumber: 101,
    checkIn: "2025-05-06",
    checkOut: "2025-05-10",
    status: "Confirmed",
    paymentStatus: "Pending",
    totalAmount: 396
  },
  {
    id: "B007",
    guestName: "Linda Thomas",
    roomNumber: 301,
    checkIn: "2025-05-10",
    checkOut: "2025-05-15",
    status: "Confirmed",
    paymentStatus: "Paid",
    totalAmount: 1495
  },
];

// Hotel Statistics
export const hotelStats = {
  occupancyRate: 42, // percentage
  availableRooms: 5,
  totalRooms: 12,
  checkInsToday: 2,
  checkOutsToday: 1,
  revenue: {
    today: 745,
    thisWeek: 5220,
    thisMonth: 21350
  }
};
