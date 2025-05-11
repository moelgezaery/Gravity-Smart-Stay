
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ClipboardList, DollarSign, LogOut, Search } from "lucide-react";

// Mock data for currently checked-in guests
const checkedInGuests = [
  {
    id: "G001",
    name: "Alex Johnson",
    room: "102",
    checkIn: "May 2, 2025",
    checkOut: "May 5, 2025",
    totalNights: 3,
    roomRate: 129.00,
    balance: 387.00,
    extras: 45.50
  },
  {
    id: "G003",
    name: "Michael Brown",
    room: "202",
    checkIn: "May 1, 2025",
    checkOut: "May 4, 2025",
    totalNights: 3,
    roomRate: 129.00,
    balance: 387.00,
    extras: 85.25
  },
  {
    id: "G004",
    name: "Emily Davis",
    room: "204",
    checkIn: "May 3, 2025",
    checkOut: "May 10, 2025",
    totalNights: 7,
    roomRate: 129.00,
    balance: 903.00,
    extras: 120.75
  },
  {
    id: "G006",
    name: "Jennifer Taylor",
    room: "302",
    checkIn: "May 2, 2025",
    checkOut: "May 6, 2025",
    totalNights: 4,
    roomRate: 159.00,
    balance: 636.00,
    extras: 95.00
  }
];

// Sample guest for checkout page details
const selectedGuest = {
  id: "G001",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "123-456-7890",
  room: "102",
  roomType: "Standard Double",
  checkIn: "May 2, 2025 - 14:30",
  checkOut: "May 5, 2025 - 12:00",
  totalNights: 3,
  roomRate: 129.00,
  charges: [
    { date: "May 2, 2025", description: "Room charge", amount: 129.00 },
    { date: "May 3, 2025", description: "Room charge", amount: 129.00 },
    { date: "May 4, 2025", description: "Room charge", amount: 129.00 },
    { date: "May 3, 2025", description: "Restaurant - Dinner", amount: 32.50 },
    { date: "May 4, 2025", description: "Mini bar", amount: 13.00 }
  ],
  payments: [
    { date: "May 2, 2025", method: "Credit Card", amount: 129.00, reference: "REF-287465" }
  ]
};

export default function CheckOut() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showGuestDetail, setShowGuestDetail] = useState(false);
  
  // Calculate totals
  const totalCharges = selectedGuest.charges.reduce((sum, charge) => sum + charge.amount, 0);
  const totalPayments = selectedGuest.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const balanceDue = totalCharges - totalPayments;
  
  // Filter guests based on search
  const filteredGuests = checkedInGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.room.includes(searchTerm) ||
    guest.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Check-Out</h1>
      </div>
      
      {!showGuestDetail ? (
        <Card>
          <CardHeader>
            <CardTitle>Currently Checked-In Guests</CardTitle>
            <CardDescription>Select a guest to proceed with check-out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by guest name, room number or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest ID</TableHead>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Nights</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.id}</TableCell>
                      <TableCell>{guest.name}</TableCell>
                      <TableCell>{guest.room}</TableCell>
                      <TableCell>{guest.checkIn}</TableCell>
                      <TableCell>{guest.checkOut}</TableCell>
                      <TableCell>{guest.totalNights}</TableCell>
                      <TableCell>${(guest.balance + guest.extras).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => setShowGuestDetail(true)}>
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Guest Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Check-Out: {selectedGuest.name}</CardTitle>
                  <CardDescription>Room {selectedGuest.room} - {selectedGuest.roomType}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowGuestDetail(false)}>
                  Back to List
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedGuest.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedGuest.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Check-In</p>
                  <p>{selectedGuest.checkIn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Check-Out</p>
                  <p>{selectedGuest.checkOut}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Nights</p>
                  <p>{selectedGuest.totalNights}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Room Rate</p>
                  <p>${selectedGuest.roomRate.toFixed(2)}/night</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Charges</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedGuest.charges.map((charge, index) => (
                      <TableRow key={index}>
                        <TableCell>{charge.date}</TableCell>
                        <TableCell>{charge.description}</TableCell>
                        <TableCell className="text-right">${charge.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} className="font-semibold text-right">
                        Total Charges:
                      </TableCell>
                      <TableCell className="font-semibold text-right">
                        ${totalCharges.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Payments</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedGuest.payments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.reference}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="font-semibold text-right">
                        Total Payments:
                      </TableCell>
                      <TableCell className="font-semibold text-right">
                        ${totalPayments.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Balance Due:</span>
                  <span className="font-bold">${balanceDue.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Collection</CardTitle>
              <CardDescription>Process final payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md mb-4">
                <p className="text-sm text-muted-foreground">Balance Due</p>
                <p className="text-2xl font-bold">${balanceDue.toFixed(2)}</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</label>
                <select id="paymentMethod" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="">Select payment method</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="cash">Cash</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">Amount</label>
                <Input id="amount" type="number" min="0" step="0.01" defaultValue={balanceDue.toFixed(2)} />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="reference" className="text-sm font-medium">Reference/Receipt #</label>
                <Input id="reference" placeholder="Transaction reference" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                <textarea 
                  id="notes" 
                  placeholder="Additional notes" 
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t pt-4">
              <Button className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Process Payment
              </Button>
              <Button variant="outline" className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" />
                Print Invoice
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <LogOut className="mr-2 h-4 w-4" />
                Complete Check-Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </Layout>
  );
}
