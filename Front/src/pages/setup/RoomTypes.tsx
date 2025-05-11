
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock room types data
const roomTypes = [
  {
    id: "RT001",
    name: "Standard Single",
    baseRate: 89.00,
    capacity: 1,
    bedType: "Single",
    description: "Comfortable room with a single bed, suitable for one person.",
    amenities: ["Wi-Fi", "TV", "AC", "Coffee Maker"],
    status: "Active"
  },
  {
    id: "RT002",
    name: "Standard Double",
    baseRate: 129.00,
    capacity: 2,
    bedType: "Double",
    description: "Spacious room with a double bed, perfect for couples or business travelers.",
    amenities: ["Wi-Fi", "TV", "AC", "Coffee Maker", "Mini-bar"],
    status: "Active"
  },
  {
    id: "RT003",
    name: "Deluxe Double",
    baseRate: 159.00,
    capacity: 2,
    bedType: "Queen",
    description: "Luxurious room with a queen-sized bed and premium amenities.",
    amenities: ["Wi-Fi", "TV", "AC", "Coffee Maker", "Mini-bar", "Bathtub"],
    status: "Active"
  },
  {
    id: "RT004",
    name: "Junior Suite",
    baseRate: 199.00,
    capacity: 3,
    bedType: "King",
    description: "Elegant suite with a king-sized bed and a comfortable seating area.",
    amenities: ["Wi-Fi", "TV", "AC", "Coffee Maker", "Mini-bar", "Bathtub", "Work Desk", "Sofa"],
    status: "Active"
  },
  {
    id: "RT005",
    name: "Executive Suite",
    baseRate: 259.00,
    capacity: 2,
    bedType: "King",
    description: "Luxurious suite with separate living room and bedroom, premium amenities, and city views.",
    amenities: ["Wi-Fi", "TV", "AC", "Coffee Maker", "Mini-bar", "Bathtub", "Work Desk", "Sofa", "City View"],
    status: "Active"
  },
  {
    id: "RT006",
    name: "Presidential Suite",
    baseRate: 359.00,
    capacity: 4,
    bedType: "King",
    description: "Our most exclusive accommodation with premium amenities, stunning views, and personalized service.",
    amenities: ["Wi-Fi", "TV", "AC", "Coffee Maker", "Mini-bar", "Jacuzzi", "Work Desk", "Sofa", "City View", "Lounge", "Kitchenette"],
    status: "Active"
  }
];

// Mock amenities data
const allAmenities = [
  "Wi-Fi",
  "TV",
  "AC",
  "Coffee Maker",
  "Mini-bar",
  "Bathtub",
  "Work Desk",
  "Sofa",
  "City View",
  "Ocean View",
  "Jacuzzi",
  "Kitchenette",
  "Balcony",
  "Room Service",
  "Safe"
];

// Bed type options
const bedTypes = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "queen", label: "Queen" },
  { value: "king", label: "King" },
  { value: "twin", label: "Twin" }
];

export default function RoomTypes() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentRoomType, setCurrentRoomType] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("roomTypesList");
  
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  const handleEditRoomType = (roomType: any) => {
    setCurrentRoomType(roomType);
    setSelectedAmenities(roomType.amenities);
    setEditMode(true);
    setActiveTab("addRoomType");
  };
  
  const handleCancelEdit = () => {
    setCurrentRoomType(null);
    setSelectedAmenities([]);
    setEditMode(false);
    setActiveTab("roomTypesList");
  };
  
  const handleAddNewClick = () => {
    setActiveTab("addRoomType");
  };
  
  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/setup">
            <ChevronLeft size={16} className="mr-1" />
            Back to Setup
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Room Types Setup</h1>
      </div>
      
      <Tabs defaultValue="roomTypesList" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="roomTypesList">Room Types List</TabsTrigger>
          <TabsTrigger value="addRoomType">Add Room Type</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roomTypesList" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Room Types</CardTitle>
                <CardDescription>
                  Manage your hotel's room types and their configurations
                </CardDescription>
              </div>
              <Button onClick={handleAddNewClick}>
                <Plus className="mr-2 h-4 w-4" />
                Add Room Type
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Base Rate</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Bed Type</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomTypes.map((roomType) => (
                    <TableRow key={roomType.id}>
                      <TableCell className="font-medium">{roomType.id}</TableCell>
                      <TableCell>{roomType.name}</TableCell>
                      <TableCell>${roomType.baseRate.toFixed(2)}</TableCell>
                      <TableCell>{roomType.capacity} {roomType.capacity > 1 ? "persons" : "person"}</TableCell>
                      <TableCell>{roomType.bedType}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {roomType.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {roomType.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{roomType.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{roomType.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditRoomType(roomType)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addRoomType" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>{editMode ? `Edit ${currentRoomType?.name}` : 'Add New Room Type'}</CardTitle>
              <CardDescription>
                {editMode ? 'Update room type details' : 'Define a new room type for your hotel'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="roomTypeName" className="text-sm font-medium">Room Type Name</label>
                  <Input 
                    id="roomTypeName" 
                    placeholder="e.g. Standard Double" 
                    defaultValue={editMode ? currentRoomType?.name : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="roomTypeCode" className="text-sm font-medium">Code</label>
                  <Input 
                    id="roomTypeCode" 
                    placeholder="e.g. STD" 
                    defaultValue={editMode ? currentRoomType?.id?.replace('RT', '') : ''}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="baseRate" className="text-sm font-medium">Base Rate</label>
                  <Input 
                    id="baseRate" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    defaultValue={editMode ? currentRoomType?.baseRate : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="capacity" className="text-sm font-medium">Capacity</label>
                  <Input 
                    id="capacity" 
                    type="number" 
                    min="1" 
                    placeholder="1" 
                    defaultValue={editMode ? currentRoomType?.capacity : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bedType" className="text-sm font-medium">Bed Type</label>
                  <Select defaultValue={editMode ? currentRoomType?.bedType.toLowerCase() : "single"}>
                    <SelectTrigger id="bedType">
                      <SelectValue placeholder="Select bed type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bedTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the room type" 
                  rows={3}
                  defaultValue={editMode ? currentRoomType?.description : ''}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Amenities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {allAmenities.map((amenity) => (
                    <div 
                      key={amenity} 
                      className={`border rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
                        selectedAmenities.includes(amenity) 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button>{editMode ? 'Update' : 'Save'} Room Type</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
