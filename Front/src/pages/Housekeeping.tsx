
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search } from "lucide-react";

// Mock room data for housekeeping
const rooms = [
  { 
    room: "101", 
    floor: "1",
    type: "Standard Single", 
    status: "vacant" as const, 
    cleaning: "Required",
    priority: "Normal",
    assignedTo: "",
    notes: "",
  },
  { 
    room: "102", 
    floor: "1",
    type: "Standard Double", 
    status: "occupied" as const, 
    cleaning: "Scheduled",
    priority: "Normal",
    assignedTo: "Maria Garcia",
    notes: "Guest requested extra towels",
  },
  { 
    room: "103", 
    floor: "1",
    type: "Standard Double", 
    status: "reserved" as const, 
    cleaning: "Required",
    priority: "High",
    assignedTo: "",
    notes: "Guest arriving today, VIP",
  },
  { 
    room: "104", 
    floor: "1",
    type: "Standard Twin", 
    status: "cleaning" as const, 
    cleaning: "In Progress",
    priority: "Normal",
    assignedTo: "Carlos Rodriguez",
    notes: "",
  },
  { 
    room: "105", 
    floor: "1",
    type: "Deluxe Double", 
    status: "maintenance" as const, 
    cleaning: "Pending Maintenance",
    priority: "Normal",
    assignedTo: "",
    notes: "Bathtub repair needed",
  },
  { 
    room: "106", 
    floor: "1",
    type: "Junior Suite", 
    status: "checkout" as const, 
    cleaning: "Required",
    priority: "High",
    assignedTo: "",
    notes: "Deep cleaning required",
  },
  { 
    room: "201", 
    floor: "2",
    type: "Standard Single", 
    status: "vacant" as const, 
    cleaning: "Completed",
    priority: "Normal",
    assignedTo: "Maria Garcia",
    notes: "",
  },
  { 
    room: "202", 
    floor: "2",
    type: "Standard Double", 
    status: "occupied" as const, 
    cleaning: "Scheduled",
    priority: "Normal",
    assignedTo: "John Smith",
    notes: "",
  },
];

export default function Housekeeping() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  
  // Filter rooms based on search term and filters
  const filteredRooms = rooms.filter(room => 
    (searchTerm === "" || 
      room.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.notes.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (filterStatus.length === 0 || filterStatus.includes(room.cleaning))
  );

  // Count of rooms by cleaning status for dashboard metrics
  const requiredCount = rooms.filter(r => r.cleaning === "Required").length;
  const inProgressCount = rooms.filter(r => r.cleaning === "In Progress").length;
  const completedCount = rooms.filter(r => r.cleaning === "Completed").length;
  const totalRooms = rooms.length;
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Housekeeping Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Rooms</p>
            <p className="text-2xl font-semibold">{totalRooms}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Cleaning Required</p>
            <p className="text-2xl font-semibold text-orange-600">{requiredCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-semibold text-blue-600">{inProgressCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed Today</p>
            <p className="text-2xl font-semibold text-green-600">{completedCount}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <ToggleGroup type="multiple" value={filterStatus} onValueChange={setFilterStatus}>
            <ToggleGroupItem value="Required" className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-900">
              Required
            </ToggleGroupItem>
            <ToggleGroupItem value="Scheduled" className="data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-900">
              Scheduled
            </ToggleGroupItem>
            <ToggleGroupItem value="In Progress" className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900">
              In Progress
            </ToggleGroupItem>
            <ToggleGroupItem value="Completed" className="data-[state=on]:bg-green-100 data-[state=on]:text-green-900">
              Completed
            </ToggleGroupItem>
            <ToggleGroupItem value="Pending Maintenance" className="data-[state=on]:bg-red-100 data-[state=on]:text-red-900">
              Pending Maintenance
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cleaning Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.room}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{room.room}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>
                    <StatusBadge status={room.status} />
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      room.cleaning === "Required" ? "bg-orange-100 text-orange-800" : 
                      room.cleaning === "Scheduled" ? "bg-yellow-100 text-yellow-800" : 
                      room.cleaning === "In Progress" ? "bg-blue-100 text-blue-800" :
                      room.cleaning === "Completed" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {room.cleaning}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      room.priority === "High" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {room.priority}
                    </span>
                  </TableCell>
                  <TableCell>{room.assignedTo || "-"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{room.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
