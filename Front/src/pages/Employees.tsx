
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for employees
const employees = [
  {
    id: "E001",
    name: "Jennifer Anderson",
    position: "Front Desk Manager",
    department: "Front Office",
    email: "jennifer@grandhotel.com",
    phone: "555-101-1010",
    startDate: "Jan 15, 2023",
    status: "Active"
  },
  {
    id: "E002",
    name: "Michael Thompson",
    position: "Concierge",
    department: "Front Office",
    email: "michael@grandhotel.com",
    phone: "555-202-2020",
    startDate: "Mar 5, 2023",
    status: "Active"
  },
  {
    id: "E003",
    name: "Amanda Rodriguez",
    position: "Executive Housekeeper",
    department: "Housekeeping",
    email: "amanda@grandhotel.com",
    phone: "555-303-3030",
    startDate: "Feb 12, 2022",
    status: "Active"
  },
  {
    id: "E004",
    name: "David Park",
    position: "Maintenance Supervisor",
    department: "Maintenance",
    email: "david@grandhotel.com",
    phone: "555-404-4040",
    startDate: "Jul 20, 2023",
    status: "Active"
  },
  {
    id: "E005",
    name: "Sarah Williams",
    position: "Restaurant Manager",
    department: "Food & Beverage",
    email: "sarah@grandhotel.com",
    phone: "555-505-5050",
    startDate: "Apr 10, 2022",
    status: "On Leave"
  },
  {
    id: "E006",
    name: "James Peterson",
    position: "Night Auditor",
    department: "Accounting",
    email: "james@grandhotel.com",
    phone: "555-606-6060",
    startDate: "Sep 15, 2023",
    status: "Active"
  }
];

// Sample schedules
const schedules = [
  {
    id: "S001",
    employeeId: "E001",
    employeeName: "Jennifer Anderson",
    position: "Front Desk Manager",
    monday: "9AM-5PM",
    tuesday: "9AM-5PM",
    wednesday: "9AM-5PM",
    thursday: "9AM-5PM",
    friday: "9AM-5PM",
    saturday: "OFF",
    sunday: "OFF"
  },
  {
    id: "S002",
    employeeId: "E002",
    employeeName: "Michael Thompson",
    position: "Concierge",
    monday: "10AM-6PM",
    tuesday: "10AM-6PM",
    wednesday: "OFF",
    thursday: "10AM-6PM",
    friday: "10AM-6PM",
    saturday: "12PM-8PM",
    sunday: "OFF"
  },
  {
    id: "S003",
    employeeId: "E003",
    employeeName: "Amanda Rodriguez",
    position: "Executive Housekeeper",
    monday: "7AM-3PM",
    tuesday: "7AM-3PM",
    wednesday: "7AM-3PM",
    thursday: "OFF",
    friday: "7AM-3PM",
    saturday: "7AM-3PM",
    sunday: "OFF"
  },
  {
    id: "S004",
    employeeId: "E004",
    employeeName: "David Park",
    position: "Maintenance Supervisor",
    monday: "8AM-4PM",
    tuesday: "8AM-4PM",
    wednesday: "8AM-4PM",
    thursday: "8AM-4PM",
    friday: "8AM-4PM",
    saturday: "OFF",
    sunday: "OFF"
  },
  {
    id: "S005",
    employeeId: "E005",
    employeeName: "Sarah Williams",
    position: "Restaurant Manager",
    monday: "ON LEAVE",
    tuesday: "ON LEAVE",
    wednesday: "ON LEAVE",
    thursday: "ON LEAVE",
    friday: "ON LEAVE",
    saturday: "ON LEAVE",
    sunday: "ON LEAVE"
  },
  {
    id: "S006",
    employeeId: "E006",
    employeeName: "James Peterson",
    position: "Night Auditor",
    monday: "11PM-7AM",
    tuesday: "11PM-7AM",
    wednesday: "11PM-7AM",
    thursday: "OFF",
    friday: "OFF",
    saturday: "11PM-7AM",
    sunday: "11PM-7AM"
  }
];

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("employees");
  const { toast } = useToast();
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter schedules based on search term
  const filteredSchedules = schedules.filter(schedule =>
    schedule.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    toast({
      title: "Employee Added",
      description: "New employee has been added successfully."
    });
  };

  const handleEditEmployee = (employeeId: string) => {
    toast({
      title: "Employee Updated",
      description: `Employee ${employeeId} has been updated successfully.`
    });
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter details for the new employee
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="position" className="text-right text-sm font-medium">
                  Position
                </label>
                <Input id="position" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="department" className="text-right text-sm font-medium">
                  Department
                </label>
                <Select>
                  <SelectTrigger id="department" className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="front-office">Front Office</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startDate" className="text-right text-sm font-medium">
                  Start Date
                </label>
                <Input id="startDate" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="employees">Employee Directory</TabsTrigger>
          <TabsTrigger value="schedule">Employee Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>Manage hotel staff information</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees by name, position, or department..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.startDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            employee.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {employee.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">Edit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Edit Employee</DialogTitle>
                                <DialogDescription>
                                  Update employee information
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Full Name
                                  </label>
                                  <Input defaultValue={employee.name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Position
                                  </label>
                                  <Input defaultValue={employee.position} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Department
                                  </label>
                                  <Select>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder={employee.department} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="front-office">Front Office</SelectItem>
                                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                                      <SelectItem value="maintenance">Maintenance</SelectItem>
                                      <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                                      <SelectItem value="accounting">Accounting</SelectItem>
                                      <SelectItem value="hr">Human Resources</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Email
                                  </label>
                                  <Input defaultValue={employee.email} type="email" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Phone
                                  </label>
                                  <Input defaultValue={employee.phone} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Status
                                  </label>
                                  <Select>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder={employee.status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="on-leave">On Leave</SelectItem>
                                      <SelectItem value="terminated">Terminated</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => handleEditEmployee(employee.id)}>
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Employee Schedule</CardTitle>
              <CardDescription>View weekly work schedules</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schedule by employee name or position..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Employee</TableHead>
                      <TableHead className="whitespace-nowrap">Position</TableHead>
                      <TableHead className="whitespace-nowrap">Monday</TableHead>
                      <TableHead className="whitespace-nowrap">Tuesday</TableHead>
                      <TableHead className="whitespace-nowrap">Wednesday</TableHead>
                      <TableHead className="whitespace-nowrap">Thursday</TableHead>
                      <TableHead className="whitespace-nowrap">Friday</TableHead>
                      <TableHead className="whitespace-nowrap">Saturday</TableHead>
                      <TableHead className="whitespace-nowrap">Sunday</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium whitespace-nowrap">{schedule.employeeName}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.position}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.monday}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.tuesday}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.wednesday}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.thursday}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.friday}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.saturday}</TableCell>
                        <TableCell className="whitespace-nowrap">{schedule.sunday}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" variant="outline" onClick={() => toast({
                title: "Schedule Updated",
                description: "Weekly schedule has been updated"
              })}>
                Edit Schedule
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
