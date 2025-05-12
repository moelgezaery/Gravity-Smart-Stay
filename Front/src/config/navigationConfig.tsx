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
  | "front_Office"
  | "room_status"
  | "guest_Concierge"
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
    permission: "front_Office", // Default dashboard shows reservation data
  },
  
  // 1. Front Office / Reception
  {
    key: "front_Office",
    label: "frontOffice",
    icon: CalendarRange,
    permission: "front_Office",
    children: [
      {
        key: "reservations",
        label: "reservations",
        icon: BookOpen,
        path: "/reservations",
        permission: "front_Office",
      }  
      ,{
        key: "checkin",
        label: "checkIn",
        icon: LogIn,
        path: "/checkin",
        permission: "guest_Concierge",
      },
      {
        key: "checkout",
        label: "checkOut",
        icon: LogOut,
        path: "/checkout",
        permission: "guest_Concierge",
      },
      {
        key: "guests",
        label: "guests",
        icon: Users,
        path: "/guests",
        permission: "guest_Concierge",
      },
      {
        key: "arrivals",
        label: "arrivalsToday",
        icon: UserCheck,
        path: "/arrivals",
        permission: "front_Office",
      },
      {
        key: "departures",
        label: "departuresToday",
        icon: UserX,
        path: "/departures",
        permission: "front_Office",
      },
      {
        key: "new_bookings",
        label: "newBookings",
        icon: BookOpen,
        path: "/new-bookings",
        permission: "front_Office",
      },
      {
        key: "no_shows",
        label: "noShowsCancellations",
        icon: UserX,
        path: "/no-shows",
        permission: "front_Office",
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
    key: "guest_Concierge",
    label: " guestConciergeWorkflow",
    icon: Bell,
    permission: "guest_Concierge",
    children: [
 
      {
        key: "guest_requests",
        label: "guestRequests",
        icon: Bell,
        path: "/guest-requests",
        permission: "guest_Concierge",
      }
      // ,
      // {
      //   key: "late_arrivals",
      //   label: "lateArrivals",
      //   icon: AlarmClock,
      //   path: "/late-arrivals",
      //   permission: "guest_Concierge",
      // }
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
