
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, DollarSign, FileText, Search, Wallet } from "lucide-react";

// Mock data for cashier balances
const cashierBalances = [
  {
    id: 1,
    name: "John Smith",
    position: "Front Desk Agent",
    shift: "Morning",
    openingBalance: 500.00,
    currentBalance: 735.50,
    transactions: 12,
    lastUpdated: new Date("2025-05-10T10:30:00")
  },
  {
    id: 2,
    name: "Maria Garcia",
    position: "Front Desk Agent",
    shift: "Evening",
    openingBalance: 500.00,
    currentBalance: 890.75,
    transactions: 8,
    lastUpdated: new Date("2025-05-10T15:45:00")
  },
  {
    id: 3,
    name: "Ahmed Khan",
    position: "Night Auditor",
    shift: "Night",
    openingBalance: 300.00,
    currentBalance: 405.25,
    transactions: 3,
    lastUpdated: new Date("2025-05-10T02:15:00")
  },
  {
    id: 4,
    name: "Sarah Johnson",
    position: "Manager",
    shift: "Day",
    openingBalance: 1000.00,
    currentBalance: 2350.00,
    transactions: 15,
    lastUpdated: new Date("2025-05-10T16:20:00")
  }
];

export default function CashierBalances() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedShift, setSelectedShift] = useState("all");
  
  // Total amounts
  const totalOpeningBalance = cashierBalances.reduce((sum, cashier) => sum + cashier.openingBalance, 0);
  const totalCurrentBalance = cashierBalances.reduce((sum, cashier) => sum + cashier.currentBalance, 0);
  const totalTransactions = cashierBalances.reduce((sum, cashier) => sum + cashier.transactions, 0);
  const totalDifference = totalCurrentBalance - totalOpeningBalance;
  
  // Filter cashiers based on search term and selected shift
  const filteredCashiers = cashierBalances.filter(cashier => 
    (searchTerm === "" || 
      cashier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cashier.position.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (selectedShift === "all" || cashier.shift.toLowerCase() === selectedShift.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cashier Balances</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Opening Balance</p>
                <p className="text-2xl font-semibold">${totalOpeningBalance.toFixed(2)}</p>
              </div>
              <Wallet className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-semibold">${totalCurrentBalance.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Difference</p>
                <p className="text-2xl font-semibold text-green-600">+${totalDifference.toFixed(2)}</p>
              </div>
              <FileText className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-semibold">{totalTransactions}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daily Cashier Balances</CardTitle>
          <CardDescription>
            View and manage cashier balances for the selected date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by cashier name or position..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[220px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                  <SelectItem value="Day">Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cashier</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Opening Balance</TableHead>
                  <TableHead>Current Balance</TableHead>
                  <TableHead>Difference</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCashiers.map((cashier) => {
                  const difference = cashier.currentBalance - cashier.openingBalance;
                  return (
                    <TableRow key={cashier.id}>
                      <TableCell className="font-medium">{cashier.name}</TableCell>
                      <TableCell>{cashier.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{cashier.shift}</Badge>
                      </TableCell>
                      <TableCell>${cashier.openingBalance.toFixed(2)}</TableCell>
                      <TableCell>${cashier.currentBalance.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                          {difference >= 0 ? "+" : ""}{difference.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{cashier.transactions}</TableCell>
                      <TableCell>{format(cashier.lastUpdated, "hh:mm a")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredCashiers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      No cashier balances found
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
          <Button>End of Day Reconciliation</Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}
