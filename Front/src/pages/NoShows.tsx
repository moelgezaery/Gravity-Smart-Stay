
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
import { Search, CalendarClock, Calendar, ArrowUpDown, BookX, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for no-shows and cancellations
const noShowsCancellations = [
  {
    id: "RES-201",
    guestName: "Daniel Rodriguez",
    room: "105 - Deluxe King",
    checkIn: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    status: "no-show",
    amount: "$420",
    charged: "$210",
    reason: "",
    email: "daniel.r@example.com",
    phone: "+1 (555) 333-1111"
  },
  {
    id: "RES-202",
    guestName: "Sophia Kim",
    room: "208 - Executive Suite",
    checkIn: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    status: "cancelled",
    amount: "$950",
    charged: "$0",
    reason: "Family emergency",
    email: "sophia.k@example.com",
    phone: "+1 (555) 333-2222"
  },
  {
    id: "RES-203",
    guestName: "William Taylor",
    room: "307 - Standard Twin",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    status: "no-show",
    amount: "$800",
    charged: "$400",
    reason: "",
    email: "william.t@example.com",
    phone: "+1 (555) 333-3333"
  },
  {
    id: "RES-204",
    guestName: "Isabella Johnson",
    room: "412 - Family Suite",
    checkIn: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
    status: "cancelled",
    amount: "$1,200",
    charged: "$300",
    reason: "Travel restrictions",
    email: "isabella.j@example.com",
    phone: "+1 (555) 333-4444"
  },
  {
    id: "RES-205",
    guestName: "Benjamin Moore",
    room: "115 - Deluxe Queen",
    checkIn: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    checkOut: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    status: "cancelled",
    amount: "$380",
    charged: "$0",
    reason: "Changed plans",
    email: "benjamin.m@example.com",
    phone: "+1 (555) 333-5555"
  }
];

export default function NoShows() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "no-show" | "cancelled">("all");
  const [timeFilter, setTimeFilter] = useState("7days");
  const { toast } = useToast();
  
  const filteredBookings = noShowsCancellations.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && booking.status === activeTab;
  });
  
  // Calculate summary statistics
  const totalNoShows = noShowsCancellations.filter(b => b.status === "no-show").length;
  const totalCancellations = noShowsCancellations.filter(b => b.status === "cancelled").length;
  const totalLostRevenue = noShowsCancellations.reduce((acc, booking) => {
    return acc + parseFloat(booking.amount.replace('$', '').replace(',', ''));
  }, 0);
  const totalRecovered = noShowsCancellations.reduce((acc, booking) => {
    return acc + parseFloat(booking.charged.replace('$', '').replace(',', ''));
  }, 0);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "no-show":
        return <Badge variant="destructive">No-Show</Badge>;
      case "cancelled":
        return <Badge className="bg-amber-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleContact = (id: string, guestName: string) => {
    toast({
      title: "Contact Initiated",
      description: `Contacting ${guestName} regarding their reservation.`
    });
  };

  const handleCharge = (id: string, guestName: string, amount: string) => {
    toast({
      title: "Charge Processed",
      description: `A charge of ${amount} has been processed for ${guestName}.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">No-Shows & Cancellations</h1>
          <div className="flex gap-2 items-center">
            <Select
              defaultValue="7days"
              value={timeFilter}
              onValueChange={setTimeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>No-Shows</CardTitle>
              <CardDescription>Guests who didn't arrive</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <BookX className="h-8 w-8 text-destructive mr-4" />
              <p className="text-3xl font-bold">{totalNoShows}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Cancellations</CardTitle>
              <CardDescription>Formally cancelled bookings</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Ban className="h-8 w-8 text-amber-500 mr-4" />
              <p className="text-3xl font-bold">{totalCancellations}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Lost Revenue</CardTitle>
              <CardDescription>Potential revenue lost</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">${totalLostRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recovered Charges</CardTitle>
              <CardDescription>From cancellation fees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">${totalRecovered.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>No-Shows & Cancellations</CardTitle>
            <CardDescription>
              Manage reservations that were cancelled or no-shows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "all" | "no-show" | "cancelled")}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="no-show">No-Shows</TabsTrigger>
                <TabsTrigger value="cancelled">Cancellations</TabsTrigger>
              </TabsList>
              
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by guest name, reservation ID or room..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {filteredBookings.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Check-in Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Original Value</TableHead>
                        <TableHead>Charged</TableHead>
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
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {format(booking.checkIn, "MMM d, yyyy")}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">
                              {booking.amount}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={parseFloat(booking.charged.replace('$', '').replace(',', '')) > 0 
                              ? "text-green-500 font-medium" 
                              : "text-muted-foreground"
                            }>
                              {booking.charged}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {parseFloat(booking.charged.replace('$', '').replace(',', '')) === 0 && booking.status === "no-show" && (
                                <Button
                                  onClick={() => handleCharge(
                                    booking.id, 
                                    booking.guestName,
                                    "50%"
                                  )}
                                  size="sm"
                                >
                                  Charge Fee
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContact(
                                  booking.id, 
                                  booking.guestName
                                )}
                              >
                                Contact
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                Details
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
                  <AlertTitle>No records found</AlertTitle>
                  <AlertDescription>
                    There are no no-shows or cancellations matching your search criteria.
                  </AlertDescription>
                </Alert>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
