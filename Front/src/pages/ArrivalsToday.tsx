
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
import { Search, CalendarClock, Clock, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for arrivals today
const arrivalsToday = [
  {
    id: "RES-001",
    guestName: "John Smith",
    room: "101 - Deluxe King",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    status: "confirmed",
    arrivalTime: "14:00",
    notes: "Early check-in requested",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567"
  },
  {
    id: "RES-002",
    guestName: "Sarah Johnson",
    room: "205 - Executive Suite",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    status: "confirmed",
    arrivalTime: "15:30",
    notes: "Business guest, VIP treatment",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543"
  },
  {
    id: "RES-003",
    guestName: "Robert Chen",
    room: "310 - Standard Twin",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    status: "pending",
    arrivalTime: "12:00",
    notes: "Prepaid, requesting extra towels",
    email: "robert.c@example.com",
    phone: "+1 (555) 456-7890"
  },
  {
    id: "RES-004",
    guestName: "Melissa Davis",
    room: "402 - Family Suite",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    status: "confirmed",
    arrivalTime: "18:00",
    notes: "Late arrival confirmed, traveling with 2 children",
    email: "melissa.davis@example.com",
    phone: "+1 (555) 789-0123"
  }
];

export default function ArrivalsToday() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredArrivals = arrivalsToday.filter(arrival => {
    return (
      arrival.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrival.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrival.room.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCheckIn = (id: string, guestName: string) => {
    toast({
      title: "Guest Checked In",
      description: `${guestName} has been successfully checked in.`
    });
  };

  const handleSendMessage = (id: string, guestName: string) => {
    toast({
      title: "Message Sent",
      description: `A welcome message has been sent to ${guestName}.`
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Arrivals Today</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarClock className="mr-2 h-4 w-4" />
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </Button>
            <Button>Check In All</Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Expected Arrivals</CardTitle>
            <CardDescription>
              {arrivalsToday.length} guests expected to arrive today
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

            {filteredArrivals.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Arrival Time
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredArrivals.map((arrival) => (
                      <TableRow key={arrival.id}>
                        <TableCell>
                          <div className="font-medium">{arrival.guestName}</div>
                          <div className="text-xs text-muted-foreground">{arrival.id}</div>
                        </TableCell>
                        <TableCell>{arrival.room}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {arrival.arrivalTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={arrival.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}
                          >
                            {arrival.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={arrival.notes}>
                            {arrival.notes}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleCheckIn(arrival.id, arrival.guestName)}
                              size="sm"
                            >
                              Check In
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendMessage(arrival.id, arrival.guestName)}
                            >
                              Message
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
                <AlertTitle>No arrivals found</AlertTitle>
                <AlertDescription>
                  There are no arrivals matching your search criteria.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
