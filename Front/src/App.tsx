import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Existing pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Setup from "./pages/Setup";
import HotelDetails from "./pages/HotelDetails";
import Rooms from "./pages/Rooms";
import Guests from "./pages/Guests";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Payments from "./pages/Payments";
import Charges from "./pages/Charges";
import Housekeeping from "./pages/Housekeeping";
import Employees from "./pages/Employees";
import Companies from "./pages/Companies";
import Maintenance from "./pages/Maintenance";
import { Reports } from "./pages/Reports";
import Login from "./pages/Login";
import Reservations from "./pages/Reservations";
import CloseDay from "./pages/CloseDay";

// New reservation snapshot pages
import ArrivalsToday from "./pages/ArrivalsToday";
import DeparturesToday from "./pages/DeparturesToday";
import NewBookings from "./pages/NewBookings";
import NoShows from "./pages/NoShows";

// New financial pages
import CashierBalances from "./pages/CashierBalances";
import OutstandingInvoices from "./pages/OutstandingInvoices"; 
import PostStayBilling from "./pages/PostStayBilling";

// Setup pages
import RoomTypes from "./pages/setup/RoomTypes";
import Floors from "./pages/setup/Floors";
import Users from "./pages/setup/Users";
import Currencies from "./pages/setup/Currencies";
import Services from "./pages/setup/Services";
import GeneralSettings from "./pages/setup/GeneralSettings";
import HousekeepingSetup from "./pages/setup/Housekeeping";
import MaintenanceSetup from "./pages/setup/Maintenance";
import RoomRates from "./pages/setup/RoomRates";

// New demo page for testing permissions
import PermissionDemo from "./pages/PermissionDemo";

const queryClient = new QueryClient();

// Placeholder component for new pages that haven't been implemented yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col min-h-screen">
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground">This page is coming soon.</p>
      </div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          
          {/* Reservation Snapshot */}
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/arrivals" element={<ArrivalsToday />} />
          <Route path="/departures" element={<DeparturesToday />} />
          <Route path="/new-bookings" element={<NewBookings />} />
          <Route path="/no-shows" element={<NoShows />} />
          
          {/* Room Status & Housekeeping */}
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/housekeeping" element={<Housekeeping />} />
          
          {/* Front Desk */}
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/guest-requests" element={<NotFound />} />
          <Route path="/late-arrivals" element={<NotFound />} />
          
          {/* Financial */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/charges" element={<Charges />} />
          <Route path="/cashier" element={<CashierBalances />} />
          <Route path="/invoices" element={<OutstandingInvoices />} />
          <Route path="/post-stay" element={<PostStayBilling />} />
          <Route path="/closeday" element={<CloseDay />} />
          
          {/* Reports */}
          <Route path="/reports" element={<Reports />} />
          
          {/* System */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/maintenance" element={<Maintenance />} />
          
          {/* Setup Routes */}
          <Route path="/setup" element={<Setup />} />
          <Route path="/setup/hotel-details" element={<HotelDetails />} />
          <Route path="/setup/room-types" element={<RoomTypes />} />
          <Route path="/setup/rooms-floors" element={<Floors />} />
          <Route path="/setup/users" element={<Users />} />
          <Route path="/setup/currencies" element={<Currencies />} />
          <Route path="/setup/services" element={<Services />} />
          <Route path="/setup/settings" element={<GeneralSettings />} />
          <Route path="/setup/housekeeping" element={<HousekeepingSetup />} />
          <Route path="/setup/maintenance" element={<MaintenanceSetup />} />
          <Route path="/setup/room-rates" element={<RoomRates />} />
          
          {/* Permission Demo */}
          <Route path="/permission-demo" element={<PermissionDemo />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
