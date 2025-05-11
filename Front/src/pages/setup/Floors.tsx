
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, ChevronLeft, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

// Mock floors data
const floors = [
  {
    id: 1,
    name: "Ground Floor",
    description: "Lobby, Reception, Restaurant, and Conference Rooms",
    roomsCount: 4
  },
  {
    id: 2,
    name: "First Floor",
    description: "Standard and Deluxe rooms",
    roomsCount: 15
  },
  {
    id: 3,
    name: "Second Floor",
    description: "Premium rooms with city view",
    roomsCount: 12
  },
  {
    id: 4,
    name: "Third Floor",
    description: "Executive suites and Presidential suite",
    roomsCount: 8
  }
];

export default function Floors() {
  const [editMode, setEditMode] = useState(false);
  const [currentFloor, setCurrentFloor] = useState<any>(null);
  
  const handleEditFloor = (floor: any) => {
    setCurrentFloor(floor);
    setEditMode(true);
  };
  
  const handleCancelEdit = () => {
    setCurrentFloor(null);
    setEditMode(false);
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
        <h1 className="text-3xl font-bold">Floors Setup</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hotel Floors</CardTitle>
                <CardDescription>Manage your hotel floors and their details</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Floor Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Rooms</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {floors.map((floor) => (
                    <TableRow key={floor.id}>
                      <TableCell className="font-medium">{floor.id}</TableCell>
                      <TableCell>{floor.name}</TableCell>
                      <TableCell>{floor.description}</TableCell>
                      <TableCell>{floor.roomsCount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditFloor(floor)}>
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
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{editMode ? `Edit ${currentFloor?.name}` : 'Add New Floor'}</CardTitle>
              <CardDescription>
                {editMode ? 'Update floor information' : 'Define a new floor for your hotel'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="floorName" className="text-sm font-medium">Floor Name</label>
                <Input 
                  id="floorName" 
                  placeholder="e.g. First Floor" 
                  defaultValue={editMode ? currentFloor?.name : ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="floorNumber" className="text-sm font-medium">Floor Number</label>
                  <Input 
                    id="floorNumber" 
                    type="number" 
                    placeholder="e.g. 1" 
                    defaultValue={editMode ? currentFloor?.id : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="roomNumberPrefix" className="text-sm font-medium">Room Number Prefix</label>
                  <Input 
                    id="roomNumberPrefix" 
                    placeholder="e.g. 1 for rooms 101, 102..." 
                    defaultValue={editMode ? currentFloor?.id : ''}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="floorDescription" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="floorDescription" 
                  placeholder="Brief description of the floor" 
                  defaultValue={editMode ? currentFloor?.description : ''}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button>{editMode ? 'Update' : 'Save'} Floor</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Floor Map</CardTitle>
              <CardDescription>
                Upload a visual map of the floor layout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 bg-muted/50 rounded-md">
                <label htmlFor="floor-map-upload" className="cursor-pointer text-center p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Click to upload</span>
                    <span className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 5MB)</span>
                  </div>
                  <Input id="floor-map-upload" type="file" className="sr-only" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
