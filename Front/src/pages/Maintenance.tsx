
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
import { Search, Plus, ClipboardPen, Wrench, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { maintenanceRequestSupabaseService } from "@/services/maintenanceRequestSupabaseService";
import { 
  MaintenanceRequest, 
  MaintenanceRequestCreate, 
  MaintenanceRequestUpdate, 
  MaintenancePriority, 
  MaintenanceStatus 
} from "@/types/maintenanceRequest";
import { roomService } from "@/services/roomService"; 
import { Room } from "@/types/room";

// Sample data for maintenance staff (in a real app, this would come from the database)
const maintenanceStaff = [
  { id: 1, name: "Robert Johnson", position: "Chief Engineer", phone: "555-1234" },
  { id: 2, name: "Maria Garcia", position: "Maintenance Technician", phone: "555-2345" },
  { id: 3, name: "David Kim", position: "HVAC Specialist", phone: "555-3456" },
  { id: 4, name: "Sarah Patel", position: "Electrician", phone: "555-4567" },
  { id: 5, name: "James Wilson", position: "Plumber", phone: "555-5678" },
];

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

  // New maintenance request form state
  const [newRequest, setNewRequest] = useState<{
    roomId: number | null;
    title: string;
    description: string;
    priority: MaintenancePriority;
    assignedToId?: number;
    estimatedCost?: number;
  }>({
    roomId: null,
    title: "",
    description: "",
    priority: "Medium",
    assignedToId: undefined,
    estimatedCost: undefined,
  });

  // Edit maintenance request form state
  const [editedRequest, setEditedRequest] = useState<MaintenanceRequestUpdate>({});
  
  const { toast } = useToast();
  
  // Fetch maintenance requests and rooms on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [requestsData, roomsData] = await Promise.all([
          maintenanceRequestSupabaseService.getMaintenanceRequests(),
          roomService.getRooms()
        ]);
        
        setMaintenanceRequests(requestsData);
        setRooms(roomsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load maintenance data. Please try again later.");
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load maintenance data. Please try again later."
        });
      }
    };

    fetchData();
  }, [toast]);
  
  // Filter maintenance requests based on search, priority, and status
  const filteredRequests = maintenanceRequests.filter(request =>
    (searchTerm === "" || 
      (request.room?.roomNumber && request.room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (priorityFilter === "" || priorityFilter === "all-priorities" || request.priority === priorityFilter) &&
    (statusFilter === "" || statusFilter === "all-statuses" || request.status === statusFilter)
  );
  
  const handleCreateRequest = async () => {
    if (!newRequest.roomId || !newRequest.title || !newRequest.description || !newRequest.priority) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields"
      });
      return;
    }

    try {
      const createdRequest = await maintenanceRequestSupabaseService.createMaintenanceRequest({
        roomId: newRequest.roomId,
        title: newRequest.title,
        description: newRequest.description,
        priority: newRequest.priority,
        assignedToId: newRequest.assignedToId,
        estimatedCost: newRequest.estimatedCost
      });
      
      // Refresh the requests list with the new request
      setMaintenanceRequests([...maintenanceRequests, createdRequest]);
      
      toast({
        title: "Maintenance Request Created",
        description: "New maintenance request has been created successfully."
      });
      
      // Reset the form and close the dialog
      setNewRequest({
        roomId: null,
        title: "",
        description: "",
        priority: "Medium",
        assignedToId: undefined,
        estimatedCost: undefined
      });
      setNewRequestOpen(false);
    } catch (err) {
      console.error("Error creating maintenance request:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create maintenance request. Please try again."
      });
    }
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;
    
    try {
      await maintenanceRequestSupabaseService.updateMaintenanceRequest(
        selectedRequest.id,
        editedRequest
      );
      
      // Refresh the requests list with the updated request
      const updatedRequests = await maintenanceRequestSupabaseService.getMaintenanceRequests();
      setMaintenanceRequests(updatedRequests);
      
      toast({
        title: "Request Updated",
        description: "Maintenance request has been updated successfully."
      });
      
      // Reset the form and close the dialog
      setEditedRequest({});
      setDetailsOpen(false);
    } catch (err) {
      console.error("Error updating maintenance request:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update maintenance request. Please try again."
      });
    }
  };
  
  const openRequestDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setEditedRequest({
      status: request.status,
      assignedToId: request.assignedToId,
      resolutionNotes: request.resolutionNotes,
      actualCost: request.actualCost
    });
    setDetailsOpen(true);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading maintenance data...</span>
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
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <Dialog open={newRequestOpen} onOpenChange={setNewRequestOpen}>
          <DialogTrigger asChild>
            <Button>
              <ClipboardPen className="mr-2 h-4 w-4" />
              New Maintenance Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
              <DialogDescription>
                Enter details for the new maintenance request
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="room" className="text-right text-sm font-medium">
                  Room/Location
                </label>
                <Select 
                  value={newRequest.roomId?.toString() || ""} 
                  onValueChange={(value) => setNewRequest({...newRequest, roomId: parseInt(value)})}
                >
                  <SelectTrigger id="room" className="col-span-3">
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.roomNumber} - Floor {room.floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right text-sm font-medium">
                  Title
                </label>
                <Input 
                  id="title" 
                  className="col-span-3" 
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="priority" className="text-right text-sm font-medium">
                  Priority
                </label>
                <Select 
                  value={newRequest.priority} 
                  onValueChange={(value) => setNewRequest({
                    ...newRequest, 
                    priority: value as MaintenancePriority
                  })}
                >
                  <SelectTrigger id="priority" className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right text-sm font-medium">
                  Description
                </label>
                <Textarea 
                  id="description" 
                  className="col-span-3" 
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="estimatedCost" className="text-right text-sm font-medium">
                  Est. Cost
                </label>
                <Input 
                  id="estimatedCost" 
                  type="number" 
                  className="col-span-3"
                  value={newRequest.estimatedCost || ''}
                  onChange={(e) => setNewRequest({
                    ...newRequest, 
                    estimatedCost: e.target.value ? parseFloat(e.target.value) : undefined
                  })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="assignedTo" className="text-right text-sm font-medium">
                  Assign to
                </label>
                <Select 
                  value={newRequest.assignedToId?.toString() || ''} 
                  onValueChange={(value) => setNewRequest({
                    ...newRequest, 
                    assignedToId: value ? parseInt(value) : undefined
                  })}
                >
                  <SelectTrigger id="assignedTo" className="col-span-3">
                    <SelectValue placeholder="Assign maintenance staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {maintenanceStaff.map(staff => (
                      <SelectItem key={staff.id} value={staff.id.toString()}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewRequestOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateRequest}>Create Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
          <CardDescription>View and manage maintenance tasks</CardDescription>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-priorities">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-statuses">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="InProgress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No maintenance requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => {
                    const assignedStaff = maintenanceStaff.find(staff => staff.id === request.assignedToId);
                    
                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        <TableCell>{request.room?.roomNumber || 'Unknown'}</TableCell>
                        <TableCell>
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {request.description}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              request.priority === "Emergency" 
                                ? "bg-red-100 text-red-800" 
                                : request.priority === "High" 
                                  ? "bg-orange-100 text-orange-800" 
                                  : request.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              request.status === "Pending" 
                                ? "bg-blue-100 text-blue-800" 
                                : request.status === "InProgress"
                                  ? "bg-purple-100 text-purple-800"
                                  : request.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openRequestDetails(request)}
                            >
                              <Wrench className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Staff</CardTitle>
            <CardDescription>Staff available for maintenance tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.phone}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">View Schedule</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Maintenance Request Details</DialogTitle>
              <DialogDescription>
                Request ID: #{selectedRequest.id}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Room
                </label>
                <div className="col-span-3">{selectedRequest.room?.roomNumber || 'Unknown'}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Title
                </label>
                <div className="col-span-3">{selectedRequest.title}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Description
                </label>
                <div className="col-span-3">{selectedRequest.description}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Priority
                </label>
                <div className="col-span-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedRequest.priority === "Emergency" 
                        ? "bg-red-100 text-red-800" 
                        : selectedRequest.priority === "High" 
                          ? "bg-orange-100 text-orange-800" 
                          : selectedRequest.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                    }`}
                  >
                    {selectedRequest.priority}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">
                  Created
                </label>
                <div className="col-span-3">{new Date(selectedRequest.createdAt).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right text-sm font-medium">
                  Status
                </label>
                <Select 
                  value={editedRequest.status || selectedRequest.status} 
                  onValueChange={(value) => setEditedRequest({
                    ...editedRequest, 
                    status: value as MaintenanceStatus
                  })}
                >
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="InProgress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="assignedToId" className="text-right text-sm font-medium">
                  Assigned To
                </label>
                <Select 
                  value={(editedRequest.assignedToId !== undefined 
                    ? editedRequest.assignedToId?.toString() 
                    : selectedRequest.assignedToId?.toString()) || ''}
                  onValueChange={(value) => setEditedRequest({
                    ...editedRequest, 
                    assignedToId: value ? parseInt(value) : undefined
                  })}
                >
                  <SelectTrigger id="assignedToId" className="col-span-3">
                    <SelectValue placeholder="Assign maintenance staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {maintenanceStaff.map(staff => (
                      <SelectItem key={staff.id} value={staff.id.toString()}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="estimatedCost" className="text-right text-sm font-medium">
                  Est. Cost
                </label>
                <div className="col-span-3">
                  ${selectedRequest.estimatedCost?.toFixed(2) || 'Not specified'}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="actualCost" className="text-right text-sm font-medium">
                  Actual Cost
                </label>
                <Input 
                  id="actualCost" 
                  type="number" 
                  className="col-span-3"
                  value={editedRequest.actualCost !== undefined 
                    ? editedRequest.actualCost
                    : selectedRequest.actualCost || ''}
                  onChange={(e) => setEditedRequest({
                    ...editedRequest, 
                    actualCost: e.target.value ? parseFloat(e.target.value) : undefined
                  })}
                  placeholder="Enter actual cost"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="resolutionNotes" className="text-right text-sm font-medium">
                  Resolution Notes
                </label>
                <Textarea 
                  id="resolutionNotes" 
                  className="col-span-3" 
                  value={editedRequest.resolutionNotes !== undefined
                    ? editedRequest.resolutionNotes
                    : selectedRequest.resolutionNotes || ''}
                  onChange={(e) => setEditedRequest({
                    ...editedRequest, 
                    resolutionNotes: e.target.value || undefined
                  })}
                  placeholder="Enter resolution notes"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateRequest}>Update Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
}
