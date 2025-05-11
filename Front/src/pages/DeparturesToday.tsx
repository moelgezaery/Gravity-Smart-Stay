
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
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CalendarClock, Clock, CreditCard, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for departures today
const departuresToday = [
  {
    id: "RES-005",
    guestName: "Amanda Wilson",
    room: "103 - Deluxe King",
    checkIn: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    checkOut: new Date(),
    departureTime: "11:00",
    status: "checked-in",
    balance: "$0.00",
    notes: "",
    email: "amanda.w@example.com",
    phone: "+1 (555) 333-4444"
  },
  {
    id: "RES-006",
    guestName: "Michael Brown",
    room: "215 - Executive Suite",
    checkIn: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
    checkOut: new Date(),
    departureTime: "12:00",
    status: "checked-in",
    balance: "$57.50",
    notes: "Mini-bar charges pending",
    email: "m.brown@example.com",
    phone: "+1 (555) 222-3333"
  },
  {
    id: "RES-007",
    guestName: "Jessica Lee",
    room: "320 - Standard Twin",
    checkIn: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000),
    checkOut: new Date(),
    departureTime: "10:00",
    status: "checked-in",
    balance: "$125.00",
    notes: "Late checkout requested (+1 hour)",
    email: "jess.lee@example.com",
    phone: "+1 (555) 111-7777"
  },
  {
    id: "RES-008",
    guestName: "Thomas Garcia",
    room: "410 - Family Suite",
    checkIn: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    checkOut: new Date(),
    departureTime: "13:00",
    status: "checkout-in-progress",
    balance: "$0.00",
    notes: "Extended stay guest, VIP",
    email: "t.garcia@example.com",
    phone: "+1 (555) 999-8888"
  }
];

export default function DeparturesToday() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredDepartures = departuresToday.filter(departure => {
    return (
      departure.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      departure.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      departure.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate totals
  const totalDepartures = departuresToday.length;
  const pendingBalance = departuresToday
    .reduce((total, departure) => total + parseFloat(departure.balance.replace('$', '')), 0)
    .toFixed(2);

  const handleCheckout = (id: string, guestName: string, balance: string) => {
    if (parseFloat(balance.replace('$', '')) > 0) {
      toast({
        variant: "destructive",
        title: "Outstanding Balance",
        description: `${guestName} has an outstanding balance of ${balance}. Please collect payment before checkout.`
      });
    } else {
      toast({
        title: "Guest Checked Out",
        description: `${guestName} has been successfully checked out.`
      });
    }
  };

  const handleCollectPayment = (id: string, guestName: string, balance: string) => {
    toast({
      title: "Payment Collected",
      description: `Payment of ${balance} collected from ${guestName}.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Departures Today</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarClock className="mr-2 h-4 w-4" />
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Departures</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalDepartures}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">${pendingBalance}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Completed Checkouts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{departuresToday.filter(d => d.status === "checkout-in-progress").length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Expected Departures</CardTitle>
            <CardDescription>
              Guests scheduled to check out today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by guest name, reservation ID or room..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredDepartures.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Checkout Time
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepartures.map((departure) => (
                      <TableRow key={departure.id}>
                        <TableCell>
                          <div className="font-medium">{departure.guestName}</div>
                          <div className="text-xs text-muted-foreground">{departure.id}</div>
                        </TableCell>
                        <TableCell>{departure.room}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {departure.departureTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={departure.status === "checkout-in-progress" 
                              ? "bg-amber-500" 
                              : "bg-blue-500"
                            }
                          >
                            {departure.status === "checkout-in-progress" 
                              ? "In Progress" 
                              : "Checked In"
                            }
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={parseFloat(departure.balance.replace('$', '')) > 0 
                            ? "text-red-500 font-medium" 
                            : ""
                          }>
                            {departure.balance}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {parseFloat(departure.balance.replace('$', '')) > 0 ? (
                              <Button
                                onClick={() => handleCollectPayment(
                                  departure.id, 
                                  departure.guestName,
                                  departure.balance
                                )}
                                size="sm"
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Collect
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleCheckout(
                                  departure.id, 
                                  departure.guestName,
                                  departure.balance
                                )}
                                size="sm"
                              >
                                Check Out
                              </Button>
                            )}
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
                <AlertTitle>No departures found</AlertTitle>
                <AlertDescription>
                  There are no departures matching your search criteria.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
