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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, FileText, Plus, Search, Tag, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for occupied rooms
const occupiedRooms = [
  { 
    room: "102", 
    guest: "Alex Johnson", 
    checkIn: "May 2, 2025", 
    checkOut: "May 5, 2025",
    balance: 387.00
  },
  { 
    room: "202", 
    guest: "Michael Brown", 
    checkIn: "May 1, 2025", 
    checkOut: "May 4, 2025",
    balance: 472.25
  },
  { 
    room: "204", 
    guest: "Emily Davis", 
    checkIn: "May 3, 2025", 
    checkOut: "May 10, 2025",
    balance: 1023.75
  },
  { 
    room: "302", 
    guest: "Jennifer Taylor", 
    checkIn: "May 2, 2025", 
    checkOut: "May 6, 2025",
    balance: 731.00
  }
];

// Mock data for available services/charges
const chargeTypes = [
  { id: "room-service", name: "Room Service", categories: ["Food", "Beverage", "Snacks"] },
  { id: "restaurant", name: "Restaurant", categories: ["Breakfast", "Lunch", "Dinner"] },
  { id: "minibar", name: "Mini Bar", categories: ["Alcoholic", "Non-Alcoholic", "Snacks"] },
  { id: "laundry", name: "Laundry", categories: ["Regular", "Express"] },
  { id: "spa", name: "Spa Services", categories: ["Massage", "Facial", "Body Treatment"] },
  { id: "parking", name: "Parking", categories: ["Valet", "Self-Parking"] },
  { id: "phone", name: "Phone Calls", categories: ["Local", "International"] },
  { id: "misc", name: "Miscellaneous", categories: ["Other"] }
];

// Mock charge history
const chargeHistory = [
  { 
    id: "C001", 
    date: "May 3, 2025", 
    room: "102", 
    guest: "Alex Johnson",
    type: "Room Service", 
    description: "Breakfast - Continental", 
    amount: 24.50, 
    status: "Posted"
  },
  { 
    id: "C002", 
    date: "May 3, 2025", 
    room: "204", 
    guest: "Emily Davis",
    type: "Restaurant", 
    description: "Dinner - Main Restaurant", 
    amount: 78.25, 
    status: "Posted"
  },
  { 
    id: "C003", 
    date: "May 3, 2025", 
    room: "202", 
    guest: "Michael Brown",
    type: "Mini Bar", 
    description: "Assorted items", 
    amount: 42.50, 
    status: "Posted"
  },
  { 
    id: "C004", 
    date: "May 4, 2025", 
    room: "102", 
    guest: "Alex Johnson",
    type: "Laundry", 
    description: "Express service", 
    amount: 21.00, 
    status: "Posted"
  },
  { 
    id: "C005", 
    date: "May 4, 2025", 
    room: "302", 
    guest: "Jennifer Taylor",
    type: "Spa Services", 
    description: "Full body massage", 
    amount: 95.00, 
    status: "Posted"
  }
];

export default function Charges() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const { toast } = useToast();
  
  // Filter charge history based on search term
  const filteredHistory = chargeHistory.filter(charge => 
    charge.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.room.includes(searchTerm) ||
    charge.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = (typeId: string) => {
    toast({
      title: "Category added",
      description: "New category has been added successfully"
    });
  };

  const handleEditService = (typeId: string) => {
    toast({
      title: "Service edited",
      description: "Service has been updated successfully"
    });
  };

  const handlePostCharge = () => {
    if (!selectedRoom) {
      toast({
        title: "Error",
        description: "Please select a room before posting a charge",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Charge posted",
      description: "The charge has been posted successfully"
    });
  };
  
  const handleAddService = () => {
    toast({
      title: "Service added",
      description: "New service has been added successfully"
    });
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Charges & Services</h1>
      </div>
      
      <Tabs defaultValue="post" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="post">Post Charge</TabsTrigger>
          <TabsTrigger value="history">Charge History</TabsTrigger>
          <TabsTrigger value="services">Services Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="post">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Select Room & Guest</CardTitle>
                <CardDescription>Choose a room to apply charges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {occupiedRooms.map((room) => (
                        <TableRow key={room.room} className={selectedRoom === room.room ? "bg-muted" : undefined}>
                          <TableCell className="font-medium">{room.room}</TableCell>
                          <TableCell>{room.guest}</TableCell>
                          <TableCell>{room.checkIn}</TableCell>
                          <TableCell>{room.checkOut}</TableCell>
                          <TableCell>${room.balance.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant={selectedRoom === room.room ? "default" : "outline"}
                              onClick={() => setSelectedRoom(room.room)}
                            >
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
            
            <Card>
              <CardHeader>
                <CardTitle>Charge Information</CardTitle>
                <CardDescription>Enter charge details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="chargeType" className="text-sm font-medium">Charge Type</label>
                  <Select>
                    <SelectTrigger id="chargeType">
                      <SelectValue placeholder="Select charge type" />
                    </SelectTrigger>
                    <SelectContent>
                      {chargeTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="beverage">Beverage</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Input id="description" placeholder="Description of charge" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                  <Input id="quantity" type="number" min="1" defaultValue="1" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="unitPrice" className="text-sm font-medium">Unit Price</label>
                  <Input id="unitPrice" type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="totalAmount" className="text-sm font-medium">Total Amount</label>
                  <Input id="totalAmount" type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
                
                <div className="pt-2">
                  <Button onClick={handlePostCharge} disabled={!selectedRoom} className="w-full">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Post Charge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Charge History</CardTitle>
              <CardDescription>View and manage all posted charges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search charges by guest name, room, type or description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((charge) => (
                      <TableRow key={charge.id}>
                        <TableCell className="font-medium">{charge.id}</TableCell>
                        <TableCell>{charge.date}</TableCell>
                        <TableCell>{charge.room}</TableCell>
                        <TableCell>{charge.guest}</TableCell>
                        <TableCell>{charge.type}</TableCell>
                        <TableCell>{charge.description}</TableCell>
                        <TableCell>${charge.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {charge.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit Charge</DialogTitle>
                                <DialogDescription>
                                  Update the details for charge {charge.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Description</label>
                                  <Input defaultValue={charge.description} />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Amount</label>
                                  <Input type="number" step="0.01" defaultValue={charge.amount} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" onClick={() => toast({
                                  title: "Charge updated",
                                  description: "The charge has been updated successfully"
                                })}>
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
        
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Services & Charges Setup</CardTitle>
                <CardDescription>Manage service types and charge categories</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Create a new service type for charges
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service Name</label>
                      <Input placeholder="Enter service name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input placeholder="Brief description" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddService}>
                      Add Service
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {chargeTypes.map((type) => (
                  <div key={type.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{type.name}</h3>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Service</DialogTitle>
                              <DialogDescription>
                                Update service details
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Service Name</label>
                                <Input defaultValue={type.name} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleEditService(type.id)}>
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Tag className="mr-2 h-4 w-4" />
                              Add Category
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Category</DialogTitle>
                              <DialogDescription>
                                Create a new category for {type.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Category Name</label>
                                <Input placeholder="New category name" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleAddCategory(type.id)}>
                                Add Category
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {type.categories.map((category, index) => (
                        <div key={index} className="border rounded p-2 text-sm flex justify-between items-center">
                          {category}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <span className="sr-only">Edit category</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
