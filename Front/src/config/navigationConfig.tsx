import { 
  Home, 
  CalendarRange, 
  Users,
  LogIn,
  LogOut,
  CreditCard,
  ReceiptText,
  ClipboardCheck,
  Building2,
  Cog,
  Wrench,
  BarChartBig,
  ClockIcon,
  HotelIcon,
  UserCheck,
  UserX,
  BookOpen,
  Bed,
  AlarmClock,
  Bell,
  DollarSign,
  Receipt,
  Wallet,
  FileText,
} from "lucide-react";

export type NavigationPermission = 
  | "reservation_snapshot"
  | "room_status"
  | "front_desk"
  | "financial"
  | "analytics"
  | "system_config";

export interface NavigationItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  permission: NavigationPermission;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    key: "home",
    label: "home",
    icon: Home,
    path: "/",
    permission: "reservation_snapshot", // Default dashboard shows reservation data
  },
  
  // 1. Reservation Snapshot
  {
    key: "reservation_snapshot",
    label: "reservationSnapshot",
    icon: CalendarRange,
    permission: "reservation_snapshot",
    children: [
      {
        key: "reservations",
        label: "reservations",
        icon: BookOpen,
        path: "/reservations",
        permission: "reservation_snapshot",
      },
      {
        key: "arrivals",
        label: "arrivalsToday",
        icon: UserCheck,
        path: "/arrivals",
        permission: "reservation_snapshot",
      },
      {
        key: "departures",
        label: "departuresToday",
        icon: UserX,
        path: "/departures",
        permission: "reservation_snapshot",
      },
      {
        key: "new_bookings",
        label: "newBookings",
        icon: BookOpen,
        path: "/new-bookings",
        permission: "reservation_snapshot",
      },
      {
        key: "no_shows",
        label: "noShowsCancellations",
        icon: UserX,
        path: "/no-shows",
        permission: "reservation_snapshot",
      }
    ]
  },
  
  // 2. Room Status & Housekeeping
  {
    key: "room_status",
    label: "roomStatusHousekeeping",
    icon: Bed,
    permission: "room_status",
    children: [
      {
        key: "rooms",
        label: "rooms",
        icon: HotelIcon,
        path: "/rooms",
        permission: "room_status",
      },
      {
        key: "housekeeping",
        label: "housekeeping",
        icon: ClipboardCheck,
        path: "/housekeeping",
        permission: "room_status",
      }
    ]
  },
  
  // 3. Front-Desk Workflow
  {
    key: "front_desk",
    label: "frontDeskWorkflow",
    icon: Bell,
    permission: "front_desk",
    children: [
      {
        key: "checkin",
        label: "checkIn",
        icon: LogIn,
        path: "/checkin",
        permission: "front_desk",
      },
      {
        key: "checkout",
        label: "checkOut",
        icon: LogOut,
        path: "/checkout",
        permission: "front_desk",
      },
      {
        key: "guests",
        label: "guests",
        icon: Users,
        path: "/guests",
        permission: "front_desk",
      },
      {
        key: "guest_requests",
        label: "guestRequests",
        icon: Bell,
        path: "/guest-requests",
        permission: "front_desk",
      },
      {
        key: "late_arrivals",
        label: "lateArrivals",
        icon: AlarmClock,
        path: "/late-arrivals",
        permission: "front_desk",
      }
    ]
  },
  
  // 4. Financial Overview
  {
    key: "financial",
    label: "financialOverview",
    icon: DollarSign,
    permission: "financial",
    children: [
      {
        key: "payments",
        label: "payments",
        icon: CreditCard,
        path: "/payments",
        permission: "financial",
      },
      {
        key: "charges",
        label: "charges",
        icon: ReceiptText,
        path: "/charges",
        permission: "financial",
      },
      {
        key: "cashier",
        label: "cashierBalances",
        icon: Wallet,
        path: "/cashier",
        permission: "financial",
      },
      {
        key: "invoices",
        label: "outstandingInvoices",
        icon: Receipt,
        path: "/invoices",
        permission: "financial",
      },
      {
        key: "post_stay",
        label: "postStayBilling",
        icon: FileText,
        path: "/post-stay",
        permission: "financial",
      },
      {
        key: "closeday",
        label: "closeDay",
        icon: ClockIcon,
        path: "/closeday",
        permission: "financial",
      }
    ]
  },
  
  // 5. Analytics & Reports (keeping current)
  {
    key: "reports",
    label: "analyticsReports",
    icon: BarChartBig,
    path: "/reports",
    permission: "analytics",
  },
  
  // 6. System Configuration & Settings (keeping current)
  {
    key: "configuration",
    label: "configuration",
    icon: Cog,
    permission: "system_config",
    children: [
      {
        key: "setup",
        label: "setup",
        icon: Cog,
        path: "/setup",
        permission: "system_config",
      },
      {
        key: "employees",
        label: "employees",
        icon: Users,
        path: "/employees",
        permission: "system_config",
      },
      {
        key: "companies",
        label: "companies",
        icon: Building2,
        path: "/companies",
        permission: "system_config",
      },
      {
        key: "maintenance",
        label: "maintenance",
        icon: Wrench,
        path: "/maintenance",
        permission: "system_config",
      }
    ]
  }
];
