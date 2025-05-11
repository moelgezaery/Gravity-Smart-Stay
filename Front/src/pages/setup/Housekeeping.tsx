import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Mock housekeeping staff
const staff = [
  { id: 1, name: "Maria Garcia", role: "Housekeeping", status: "Available", assignedRooms: 2 },
  { id: 2, name: "John Smith", role: "Housekeeping", status: "Available", assignedRooms: 1 },
  { id: 3, name: "Carlos Rodriguez", role: "Housekeeping", status: "Busy", assignedRooms: 1 },
  { id: 4, name: "Aisha Johnson", role: "Housekeeping Supervisor", status: "Available", assignedRooms: 0 },
  { id: 5, name: "Robert Chen", role: "Housekeeping", status: "Off Duty", assignedRooms: 0 },
];

// Mock rooms requiring cleaning
const roomsRequiringCleaning = [
  { 
    room: "101", 
    type: "Standard Single",
    cleaning: "Required",
    priority: "Normal",
  },
  { 
    room: "103",
    type: "Standard Double", 
    cleaning: "Required",
    priority: "High",
  },
  { 
    room: "106", 
    type: "Junior Suite",
    cleaning: "Scheduled",
    priority: "Normal",
  },
];

const HousekeepingSetup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assignments");
  
  return (
    <Layout>
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-navy-500">{t("housekeepingSetup")}</h1>
          <p className="text-muted-foreground mt-1">{t("housekeepingDescription")}</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Room Assignments</CardTitle>
              <CardDescription>Assign staff to rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Available Staff</h3>
                  <div className="border rounded-md p-2 space-y-2">
                    {staff
                      .filter(s => s.status !== "Off Duty")
                      .map((staffMember) => (
                        <div key={staffMember.id} className="flex justify-between items-center p-2 border rounded hover:bg-muted cursor-pointer">
                          <div className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            <div>
                              <p className="font-medium">{staffMember.name}</p>
                              <p className="text-xs text-muted-foreground">{staffMember.role}</p>
                            </div>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              staffMember.status === "Available" ? "bg-green-100 text-green-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {staffMember.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Rooms Requiring Cleaning</h3>
                  <div className="border rounded-md p-2 space-y-2">
                    {roomsRequiringCleaning.map((room) => (
                      <div key={room.room} className="flex justify-between items-center p-2 border rounded hover:bg-muted cursor-pointer">
                        <div>
                          <p className="font-medium">Room {room.room}</p>
                          <p className="text-xs text-muted-foreground">{room.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            room.cleaning === "Required" ? "bg-orange-100 text-orange-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {room.cleaning}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            room.priority === "High" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {room.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Assignment Workflow</h3>
                <div className="border rounded-md p-4">
                  <div className="flex flex-col gap-4">
                    <p>To assign a room to a staff member:</p>
                    <ol className="list-decimal ml-4 space-y-2">
                      <li>Select a staff member from the list on the left</li>
                      <li>Select a room that needs cleaning from the list on the right</li>
                      <li>Click the "Assign" button that will appear below</li>
                    </ol>
                    <div className="flex justify-center mt-2">
                      <Button disabled>Assign Selected Room to Staff</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="staff" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Housekeeping Staff</CardTitle>
                <CardDescription>Manage housekeeping personnel</CardDescription>
              </div>
              <Button>
                <User className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Rooms</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell>
                        <div className="font-medium">{staffMember.name}</div>
                      </TableCell>
                      <TableCell>{staffMember.role}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          staffMember.status === "Available" ? "bg-green-100 text-green-800" : 
                          staffMember.status === "Busy" ? "bg-yellow-100 text-yellow-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {staffMember.status}
                        </span>
                      </TableCell>
                      <TableCell>{staffMember.assignedRooms}</TableCell>
                      <TableCell>8:00 AM - 4:00 PM</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Housekeeping Inventory</CardTitle>
              <CardDescription>Track supplies and inventory levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min. Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Bath Towels</TableCell>
                    <TableCell>Linens</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hand Towels</TableCell>
                    <TableCell>Linens</TableCell>
                    <TableCell>80</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bed Sheets (Queen)</TableCell>
                    <TableCell>Linens</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Shampoo</TableCell>
                    <TableCell>Toiletries</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Low Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Soap Bars</TableCell>
                    <TableCell>Toiletries</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cleaning Solution</TableCell>
                    <TableCell>Cleaning Supplies</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Low Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Toilet Paper</TableCell>
                    <TableCell>Toiletries</TableCell>
                    <TableCell>200</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell><span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">In Stock</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default HousekeepingSetup;
