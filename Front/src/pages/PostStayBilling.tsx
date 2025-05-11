
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CalendarIcon,
  CheckCircle,
  CreditCard,
  FileText,
  Mail,
  MailCheck,
  Search,
} from "lucide-react";

// Mock data for post-stay billings
const postStayBillings = [
  {
    id: "PSB-001",
    guestName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1-555-123-4567",
    checkOutDate: new Date("2025-05-05"),
    roomNumber: "101",
    amount: 350.75,
    status: "pending" as const,
    notified: true,
    paymentMethod: "Credit Card on File",
    lastAttempt: new Date("2025-05-07"),
    notes: "Guest was notified about additional charges"
  },
  {
    id: "PSB-002",
    guestName: "Sarah Johnson",
    email: "sarahj@example.com",
    phone: "+1-555-987-6543",
    checkOutDate: new Date("2025-05-02"),
    roomNumber: "205",
    amount: 120.50,
    status: "approved" as const,
    notified: true,
    paymentMethod: "Credit Card on File",
    lastAttempt: new Date("2025-05-03"),
    notes: "Mini-bar charges"
  },
  {
    id: "PSB-003",
    guestName: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1-555-456-7890",
    checkOutDate: new Date("2025-05-01"),
    roomNumber: "302",
    amount: 75.25,
    status: "rejected" as const,
    notified: true,
    paymentMethod: "Credit Card on File",
    lastAttempt: new Date("2025-05-04"),
    notes: "Guest disputes charges, follow up required"
  },
  {
    id: "PSB-004",
    guestName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1-555-789-0123",
    checkOutDate: new Date("2025-05-04"),
    roomNumber: "402",
    amount: 280.00,
    status: "pending" as const,
    notified: false,
    paymentMethod: "",
    lastAttempt: null,
    notes: "Room service charges on final day, guest needs to be notified"
  },
  {
    id: "PSB-005",
    guestName: "Robert Wilson",
    email: "r.wilson@example.com",
    phone: "+1-555-234-5678",
    checkOutDate: new Date("2025-04-29"),
    roomNumber: "118",
    amount: 450.20,
    status: "approved" as const,
    notified: true,
    paymentMethod: "Credit Card on File",
    lastAttempt: new Date("2025-04-30"),
    notes: "Damage to room furniture"
  }
];

type BillingStatus = "pending" | "approved" | "rejected" | "failed";

export default function PostStayBilling() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterNotified, setFilterNotified] = useState("all");
  
  // Calculate totals
  const totalAmount = postStayBillings.reduce((sum, billing) => sum + billing.amount, 0);
  const pendingAmount = postStayBillings
    .filter(billing => billing.status === "pending")
    .reduce((sum, billing) => sum + billing.amount, 0);
  const approvedAmount = postStayBillings
    .filter(billing => billing.status === "approved")
    .reduce((sum, billing) => sum + billing.amount, 0);
  
  // Filter billings based on search term, status and notification status
  const filteredBillings = postStayBillings.filter(billing => 
    (searchTerm === "" || 
      billing.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      billing.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      billing.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (filterStatus === "all" || billing.status === filterStatus) &&
    (filterNotified === "all" || 
      (filterNotified === "notified" && billing.notified) ||
      (filterNotified === "not-notified" && !billing.notified)
    )
  );
  
  const getStatusBadge = (status: BillingStatus) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "failed":
        return <Badge className="bg-gray-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Post-Stay Billing</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-semibold">${totalAmount.toFixed(2)}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold text-yellow-600">${pendingAmount.toFixed(2)}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-semibold text-green-600">${approvedAmount.toFixed(2)}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Not Notified</p>
                <p className="text-2xl font-semibold text-blue-600">
                  {postStayBillings.filter(b => !b.notified).length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Post-Stay Billing Management</CardTitle>
          <CardDescription>
            Process additional charges after guest check-out
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by billing ID, guest name or room..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={filterNotified}
                onValueChange={setFilterNotified}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Notification status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="notified">Notified</SelectItem>
                  <SelectItem value="not-notified">Not Notified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-Out Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notified</TableHead>
                  <TableHead>Last Attempt</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBillings.map((billing) => (
                  <TableRow key={billing.id}>
                    <TableCell className="font-medium">{billing.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{billing.guestName}</span>
                        <span className="text-xs text-muted-foreground">{billing.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{billing.roomNumber}</TableCell>
                    <TableCell>{format(billing.checkOutDate, "MMM dd, yyyy")}</TableCell>
                    <TableCell>${billing.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(billing.status)}</TableCell>
                    <TableCell>
                      {billing.notified ? (
                        <Badge className="bg-green-100 text-green-800">
                          Notified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          Not Notified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {billing.lastAttempt ? format(billing.lastAttempt, "MMM dd, yyyy") : "-"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {!billing.notified && (
                        <Button variant="outline" size="sm">
                          <MailCheck className="h-4 w-4 mr-1" />
                          Notify
                        </Button>
                      )}
                      {billing.status === "pending" && (
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Process
                        </Button>
                      )}
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBillings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      No post-stay billings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="flex gap-2">
            <Button variant="outline">Print Report</Button>
            <Button variant="outline">Export Data</Button>
          </div>
          <div className="flex gap-2">
            <Button>Add New Charge</Button>
          </div>
        </CardFooter>
      </Card>
    </Layout>
  );
}
