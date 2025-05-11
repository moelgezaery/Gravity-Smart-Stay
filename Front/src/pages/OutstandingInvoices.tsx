
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
import { format, addDays, differenceInDays } from "date-fns";
import { AlertCircle, FileText, Mail, Search, Send } from "lucide-react";

// Mock data for outstanding invoices
const outstandingInvoices = [
  {
    id: "INV-001",
    guestName: "John Smith",
    company: "ABC Corporation",
    amount: 1250.00,
    issueDate: new Date("2025-04-25"),
    dueDate: new Date("2025-05-25"),
    status: "pending" as const,
    email: "john.smith@example.com",
    phone: "+1-555-123-4567",
    notes: "Corporate rate applied"
  },
  {
    id: "INV-002",
    guestName: "Sarah Johnson",
    company: "",
    amount: 780.50,
    issueDate: new Date("2025-04-28"),
    dueDate: new Date("2025-05-12"),
    status: "overdue" as const,
    email: "sarahj@example.com",
    phone: "+1-555-987-6543",
    notes: "Guest requested itemized receipt"
  },
  {
    id: "INV-003",
    guestName: "Michael Brown",
    company: "XYZ Ltd",
    amount: 2150.75,
    issueDate: new Date("2025-05-01"),
    dueDate: new Date("2025-06-01"),
    status: "pending" as const,
    email: "michael.b@example.com",
    phone: "+1-555-456-7890",
    notes: "Applied 10% loyalty discount"
  },
  {
    id: "INV-004",
    guestName: "Emily Davis",
    company: "Tech Solutions Inc",
    amount: 3200.25,
    issueDate: new Date("2025-04-15"),
    dueDate: new Date("2025-05-15"),
    status: "overdue" as const,
    email: "emily.davis@example.com",
    phone: "+1-555-789-0123",
    notes: "Conference package"
  },
  {
    id: "INV-005",
    guestName: "Robert Wilson",
    company: "",
    amount: 650.00,
    issueDate: new Date("2025-05-05"),
    dueDate: new Date("2025-05-20"),
    status: "pending" as const,
    email: "r.wilson@example.com",
    phone: "+1-555-234-5678",
    notes: ""
  }
];

type InvoiceStatus = "pending" | "overdue" | "paid" | "cancelled";

export default function OutstandingInvoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Calculate totals
  const totalOutstanding = outstandingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalOverdue = outstandingInvoices
    .filter(invoice => invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPending = outstandingInvoices
    .filter(invoice => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Filter invoices based on search term and status filter
  const filteredInvoices = outstandingInvoices.filter(invoice => 
    (searchTerm === "" || 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (filterStatus === "all" || invoice.status === filterStatus)
  );
  
  const getStatusBadge = (status: InvoiceStatus) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "cancelled":
        return <Badge className="bg-gray-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const days = differenceInDays(dueDate, today);
    return days;
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Outstanding Invoices</h1>
        <div className="flex gap-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Invoices
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send Reminders
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
                <p className="text-2xl font-semibold">${totalOutstanding.toFixed(2)}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Overdue</p>
                <p className="text-2xl font-semibold text-red-600">${totalOverdue.toFixed(2)}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payment</p>
                <p className="text-2xl font-semibold text-blue-600">${totalPending.toFixed(2)}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Outstanding Invoice Management</CardTitle>
          <CardDescription>
            Track and manage unpaid invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice ID, guest name or company..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const daysRemaining = getDaysRemaining(invoice.dueDate);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.guestName}</TableCell>
                      <TableCell>{invoice.company || "-"}</TableCell>
                      <TableCell>{format(invoice.issueDate, "MMM dd, yyyy")}</TableCell>
                      <TableCell>{format(invoice.dueDate, "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        <span className={
                          daysRemaining < 0 ? "text-red-600" :
                          daysRemaining <= 5 ? "text-orange-600" :
                          "text-green-600"
                        }>
                          {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : 
                           daysRemaining === 0 ? "Due today" :
                           `${daysRemaining} days left`}
                        </span>
                      </TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      No invoices found
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
            <Button variant="outline">Mark as Paid</Button>
            <Button>Bulk Actions</Button>
          </div>
        </CardFooter>
      </Card>
    </Layout>
  );
}
