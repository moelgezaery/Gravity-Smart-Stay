import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { FloorSection } from "@/components/dashboard/FloorSection";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { roomService } from "@/services/roomService";
import { Room } from "@/types/room";

// Interface for the grouped room data by floor
// Update the interface in Rooms.tsx
interface FloorData {
  floorNumber: string;
  rooms: {
    roomNumber: string;
    type: string;
    status: "occupied" | "vacant" | "reserved" | "cleaning" | "maintenance" | "checkout";
    guest?: string;
    checkIn?: string;
    checkOut?: string;
  }[];
}

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("grid");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [roomDialog, setRoomDialog] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [floorData, setFloorData] = useState<FloorData[]>([]);
  
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    type: "standard-single",
    floor: "1",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch rooms from API on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await roomService.getRooms();
        setRooms(roomsData);
        
        // Process rooms into the format needed by UI
        organizeRoomsByFloor(roomsData);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load rooms. Please try again later.");
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load rooms. Please try again later."
        });
      }
    };

    fetchRooms();
  }, [toast]);

  const organizeRoomsByFloor = (roomsData: Room[]) => {
    const floorMap = new Map<string, FloorData>();
    
    roomsData.forEach(room => {
      const floorNumber = room.floor.toString();
      
      if (!floorMap.has(floorNumber)) {
        floorMap.set(floorNumber, {
          floorNumber,
          rooms: []
        });
      }
      
      const floorData = floorMap.get(floorNumber);
      if (floorData) {
        floorData.rooms.push({
          roomNumber: room.roomNumber,
          type: room.roomType?.name || "Unknown",
          // Cast the status to the expected union type after converting to lowercase
          status: room.status.toLowerCase() as "occupied" | "vacant" | "reserved" | "cleaning" | "maintenance" | "checkout",
        });
      }
    });
    
    setFloorData(Array.from(floorMap.values()));
  };
  const handleAddRoom = async () => {
    if (!newRoom.roomNumber || !newRoom.type || !newRoom.floor) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    try {
      // Map UI room type to backend room type ID (this mapping would need to be adjusted)
      const roomTypeMap: Record<string, number> = {
        "standard-single": 1,
        "standard-double": 2,
        "standard-twin": 3,
        "deluxe-double": 4,
        "junior-suite": 5,
        "executive-suite": 6
      };
      
      // Create the room in the backend
      const createdRoom = await roomService.createRoom({
        roomNumber: newRoom.roomNumber,
        floor: parseInt(newRoom.floor),
        status: "vacant",
        capacity: 2,
        hasBalcony: false,
        hasOceanView: false,
        roomTypeId: roomTypeMap[newRoom.type] || 1
      });
      
      // Refresh the rooms list
      const roomsData = await roomService.getRooms();
      setRooms(roomsData);
      organizeRoomsByFloor(roomsData);
      
      toast({
        title: "Room added",
        description: `Room ${newRoom.roomNumber} has been added successfully.`
      });
      
      setRoomDialog(false);
      setNewRoom({
        roomNumber: "",
        type: "standard-single",
        floor: "1"
      });
    } catch (err) {
      console.error("Error adding room:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add room. Please try again."
      });
    }
  };
  
  const handleRoomDetailClick = (roomNumber: string) => {
    // Find the room ID from the room number
    const room = rooms.find(r => r.roomNumber === roomNumber);
    if (room) {
      navigate(`/rooms/${room.id}`);
    } else {
      navigate(`/rooms?room=${roomNumber}`);
    }
  };

  // Calculate room statistics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === "occupied").length;
  const vacantRooms = rooms.filter(r => r.status === "vacant").length;
  const reservedRooms = rooms.filter(r => r.status === "reserved").length;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4">Loading rooms...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <Dialog open={roomDialog} onOpenChange={setRoomDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Enter the details for the new room.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomNumber" className="text-right">
                  Room Number
                </Label>
                <Input
                  id="roomNumber"
                  className="col-span-3"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({...newRoom, roomNumber: e.target.value})}
                  placeholder="101"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Room Type
                </Label>
                <Select
                  value={newRoom.type}
                  onValueChange={(value) => setNewRoom({...newRoom, type: value})}
                >
                  <SelectTrigger className="col-span-3" id="type">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard-single">Standard Single</SelectItem>
                    <SelectItem value="standard-double">Standard Double</SelectItem>
                    <SelectItem value="standard-twin">Standard Twin</SelectItem>
                    <SelectItem value="deluxe-double">Deluxe Double</SelectItem>
                    <SelectItem value="junior-suite">Junior Suite</SelectItem>
                    <SelectItem value="executive-suite">Executive Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="floor" className="text-right">
                  Floor
                </Label>
                <Select
                  value={newRoom.floor}
                  onValueChange={(value) => setNewRoom({...newRoom, floor: value})}
                >
                  <SelectTrigger className="col-span-3" id="floor">
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRoomDialog(false)}>Cancel</Button>
              <Button onClick={handleAddRoom}>Add Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRooms}</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{occupiedRooms}</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Vacant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{vacantRooms}</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reserved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{reservedRooms}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2">
            <ToggleGroup type="multiple" value={statusFilter} onValueChange={setStatusFilter} className="flex flex-wrap gap-2">
              <ToggleGroupItem value="vacant" className="data-[state=on]:bg-green-100 data-[state=on]:text-green-900">
                <Badge className="bg-green-500">Vacant</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="occupied" className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-900">
                <Badge className="bg-blue-500">Occupied</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="reserved" className="data-[state=on]:bg-orange-100 data-[state=on]:text-orange-900">
                <Badge className="bg-orange-500">Reserved</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="maintenance" className="data-[state=on]:bg-red-100 data-[state=on]:text-red-900">
                <Badge className="bg-red-500">Maintenance</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="cleaning" className="data-[state=on]:bg-purple-100 data-[state=on]:text-purple-900">
                <Badge className="bg-purple-500">Cleaning</Badge>
              </ToggleGroupItem>
              <ToggleGroupItem value="checkout" className="data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900">
                <Badge className="bg-gray-500">Checkout</Badge>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rooms..."
                className="pl-10 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ToggleGroup type="single" value={currentView} onValueChange={(value) => value && setCurrentView(value)}>
              <ToggleGroupItem value="grid" aria-label="Grid View">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List View">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="allFloors" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="allFloors">All Floors</TabsTrigger>
          {floorData.map(floor => (
            <TabsTrigger key={floor.floorNumber} value={`floor${floor.floorNumber}`}>
              Floor {floor.floorNumber}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="allFloors" className="mt-0">
          {floorData.map((floor) => (
            <FloorSection 
              key={floor.floorNumber} 
              floorNumber={floor.floorNumber} 
              rooms={floor.rooms.filter(room => 
                (statusFilter.length === 0 || statusFilter.includes(room.status)) &&
                (searchTerm === "" || 
                  room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
                )
              )}
              onRoomClick={handleRoomDetailClick}
            />
          ))}
        </TabsContent>
        
        {floorData.map((floor) => (
          <TabsContent key={floor.floorNumber} value={`floor${floor.floorNumber}`} className="mt-0">
            <FloorSection 
              floorNumber={floor.floorNumber} 
              rooms={floor.rooms.filter(room => 
                (statusFilter.length === 0 || statusFilter.includes(room.status)) &&
                (searchTerm === "" || 
                  room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
                )
              )}
              onRoomClick={handleRoomDetailClick}
            />
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
}
