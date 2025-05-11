
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Search, CalendarClock, Users, Calendar, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for new bookings
const newBookings = [
  {
    id: "RES-101",
    guestName: "Emma Thompson",
    room: "101 - Deluxe King",
    bookingDate: new Date(new Date().getTime() - 6 * 60 * 60 * 1000),
    checkIn: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
    source: "direct",
    amount: "$630",
    status: "confirmed",
    guests: 2,
    email: "emma.t@example.com",
    phone: "+1 (555) 123-0001"
  },
  {
    id: "RES-102",
    guestName: "David Carter",
    room: "205 - Executive Suite",
    bookingDate: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
    checkIn: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 17 * 24 * 60 * 60 * 1000),
    source: "booking.com",
    amount: "$980",
    status: "confirmed",
    guests: 1,
    email: "david.c@example.com",
    phone: "+1 (555) 123-0002"
  },
  {
    id: "RES-103",
    guestName: "Olivia Martinez",
    room: "310 - Standard Twin",
    bookingDate: new Date(new Date().getTime() - 18 * 60 * 60 * 1000),
    checkIn: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000),
    source: "expedia",
    amount: "$640",
    status: "pending",
    guests: 2,
    email: "olivia.m@example.com",
    phone: "+1 (555) 123-0003"
  },
  {
    id: "RES-104",
    guestName: "James Wilson",
    room: "402 - Family Suite",
    bookingDate: new Date(new Date().getTime() - 23 * 60 * 60 * 1000),
    checkIn: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
    source: "direct",
    amount: "$1,750",
    status: "confirmed",
    guests: 4,
    email: "james.w@example.com",
    phone: "+1 (555) 123-0004"
  },
  {
    id: "RES-105",
    guestName: "Sophia Lee",
    room: "118 - Deluxe Queen",
    bookingDate: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    checkIn: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    source: "airbnb",
    amount: "$420",
    status: "confirmed",
    guests: 2,
    email: "sophia.l@example.com",
    phone: "+1 (555) 123-0005"
  }
];

export default function NewBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "direct" | "ota">("all");
  const { toast } = useToast();
  
  const filteredBookings = newBookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "direct") return matchesSearch && booking.source === "direct";
    if (activeTab === "ota") return matchesSearch && booking.source !== "direct";
    
    return matchesSearch;
  });
  
  // Calculate summary statistics
  const totalNewBookings = newBookings.length;
  const directBookings = newBookings.filter(b => b.source === "direct").length;
  const otaBookings = newBookings.filter(b => b.source !== "direct").length;
  const totalRevenue = newBookings.reduce((acc, booking) => {
    return acc + parseFloat(booking.amount.replace('$', '').replace(',', ''));
  }, 0);

  const getSourceBadge = (source: string) => {
    switch(source) {
      case "direct":
        return <Badge className="bg-green-500">Direct</Badge>;
      case "booking.com":
        return <Badge className="bg-blue-500">Booking.com</Badge>;
      case "expedia":
        return <Badge className="bg-amber-500">Expedia</Badge>;
      case "airbnb":
        return <Badge className="bg-red-500">Airbnb</Badge>;
      default:
        return <Badge>{source}</Badge>;
    }
  };

  const handleConfirmBooking = (id: string, guestName: string) => {
    toast({
      title: "Booking Confirmed",
      description: `Booking for ${guestName} has been confirmed.`
    });
  };

  const handleSendConfirmation = (id: string, guestName: string) => {
    toast({
      title: "Confirmation Sent",
      description: `Confirmation email sent to ${guestName}.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">New Bookings</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarClock className="mr-2 h-4 w-4" />
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>New Bookings</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalNewBookings}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Direct Bookings</CardTitle>
              <CardDescription>From your website</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{directBookings}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>OTA Bookings</CardTitle>
              <CardDescription>From third parties</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{otaBookings}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>New bookings value</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">${totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Reservations made in the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "all" | "direct" | "ota")}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="direct">Direct Bookings</TabsTrigger>
                <TabsTrigger value="ota">OTA Bookings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by guest name, reservation ID or room..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="direct">
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search direct bookings..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="ota">
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search OTA bookings..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {filteredBookings.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Booking Time
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Stay Dates</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="font-medium">{booking.guestName}</div>
                          <div className="text-xs text-muted-foreground">{booking.id}</div>
                        </TableCell>
                        <TableCell>{booking.room}</TableCell>
                        <TableCell>
                          {format(booking.bookingDate, "HH:mm")} (
                          {Math.round((new Date().getTime() - booking.bookingDate.getTime()) / (1000 * 60 * 60))}h ago)
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {format(booking.checkIn, "MMM d")} - {format(booking.checkOut, "MMM d")}
                          </div>
                        </TableCell>
                        <TableCell>{getSourceBadge(booking.source)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            {booking.guests}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {booking.status === "pending" ? (
                              <Button
                                onClick={() => handleConfirmBooking(
                                  booking.id, 
                                  booking.guestName
                                )}
                                size="sm"
                              >
                                Confirm
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendConfirmation(
                                  booking.id, 
                                  booking.guestName
                                )}
                              >
                                Send Confirmation
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Alert>
                <AlertTitle>No bookings found</AlertTitle>
                <AlertDescription>
                  There are no new bookings matching your search criteria.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
