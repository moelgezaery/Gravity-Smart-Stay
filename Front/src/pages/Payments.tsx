
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Download, Filter, Plus } from "lucide-react";

// Mock payment data
const payments = [
  {
    id: "P001",
    date: "May 4, 2025",
    guest: "Alex Johnson",
    roomNumber: "102",
    amount: 240.50,
    method: "Credit Card",
    status: "Completed",
    reference: "REF-287465"
  },
  {
    id: "P002",
    date: "May 3, 2025",
    guest: "Emily Davis",
    roomNumber: "204",
    amount: 540.75,
    method: "Cash",
    status: "Completed",
    reference: "REF-287464"
  },
  {
    id: "P003",
    date: "May 3, 2025",
    guest: "Michael Brown",
    roomNumber: "202",
    amount: 180.00,
    method: "Credit Card",
    status: "Completed",
    reference: "REF-287463"
  },
  {
    id: "P004",
    date: "May 2, 2025",
    guest: "Jennifer Taylor",
    roomNumber: "302",
    amount: 320.25,
    method: "Bank Transfer",
    status: "Pending",
    reference: "REF-287462"
  },
  {
    id: "P005",
    date: "May 1, 2025",
    guest: "David Wilson",
    roomNumber: "206",
    amount: 150.00,
    method: "Credit Card",
    status: "Completed",
    reference: "REF-287461"
  }
];

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    guest: "",
    room: "",
    amount: "",
    method: "credit-card"
  });
  const { toast } = useToast();

  const handlePaymentSubmit = () => {
    if (!paymentDetails.guest || !paymentDetails.amount) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    toast({
      title: "Payment processed",
      description: `Payment of $${paymentDetails.amount} has been processed successfully.`
    });
    
    setPaymentDialog(false);
    setPaymentDetails({
      guest: "",
      room: "",
      amount: "",
      method: "credit-card"
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Payments</h1>
        <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process New Payment</DialogTitle>
              <DialogDescription>
                Enter the payment details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="guest" className="text-right">
                  Guest
                </Label>
                <Input
                  id="guest"
                  className="col-span-3"
                  value={paymentDetails.guest}
                  onChange={(e) => setPaymentDetails({...paymentDetails, guest: e.target.value})}
                  placeholder="Guest name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Room
                </Label>
                <Input
                  id="room"
                  className="col-span-3"
                  value={paymentDetails.room}
                  onChange={(e) => setPaymentDetails({...paymentDetails, room: e.target.value})}
                  placeholder="Room number"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  className="col-span-3"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails({...paymentDetails, amount: e.target.value})}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="method" className="text-right">
                  Method
                </Label>
                <Select
                  value={paymentDetails.method}
                  onValueChange={(value) => setPaymentDetails({...paymentDetails, method: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPaymentDialog(false)}>Cancel</Button>
              <Button onClick={handlePaymentSubmit}>Process Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 rounded-lg border">
              <DollarSign size={40} className="text-hotel-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Today's Payments</p>
                <h4 className="text-2xl font-semibold">$761.25</h4>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border">
              <DollarSign size={40} className="text-hotel-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Weekly Payments</p>
                <h4 className="text-2xl font-semibold">$3,452.80</h4>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border">
              <DollarSign size={40} className="text-hotel-500 mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payments</p>
                <h4 className="text-2xl font-semibold">$12,480.50</h4>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search payments..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.guest}</TableCell>
                      <TableCell>{payment.roomNumber}</TableCell>
                      <TableCell>${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === "Completed" ? "bg-green-100 text-green-800" : 
                          payment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-red-100 text-red-800"
                        }`}>
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toast({
                          title: "Payment details",
                          description: `Viewing details for payment ${payment.id}`
                        })}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments
                    .filter(payment => payment.status === "Completed")
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.guest}</TableCell>
                        <TableCell>{payment.roomNumber}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => toast({
                            title: "Payment details",
                            description: `Viewing details for payment ${payment.id}`
                          })}>View</Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Filtered view for pending payments will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="failed" className="mt-0">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Filtered view for failed payments will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
