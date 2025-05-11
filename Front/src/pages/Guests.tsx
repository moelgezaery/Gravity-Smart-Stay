
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for guests
const guests = [
  {
    id: "G001",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "123-456-7890",
    nationality: "United States",
    vipStatus: "Regular",
    checkIn: "May 2, 2025",
    checkOut: "May 5, 2025",
    room: "102",
    lastStay: "Dec 15, 2024",
    visits: 2
  },
  {
    id: "G002",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "234-567-8901",
    nationality: "Canada",
    vipStatus: "Regular",
    checkIn: "May 1, 2025",
    checkOut: "May 4, 2025",
    room: "202",
    lastStay: "Feb 22, 2025",
    visits: 1
  },
  {
    id: "G003",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "345-678-9012",
    nationality: "United Kingdom",
    vipStatus: "Gold",
    checkIn: "May 3, 2025",
    checkOut: "May 10, 2025",
    room: "204",
    lastStay: "Apr 5, 2025",
    visits: 5
  },
  {
    id: "G004",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "456-789-0123",
    nationality: "Australia",
    vipStatus: "Platinum",
    checkIn: "May 2, 2025",
    checkOut: "May 6, 2025",
    room: "302",
    lastStay: "Mar 18, 2025",
    visits: 8
  },
  {
    id: "G005",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "234-567-8901",
    nationality: "Germany",
    vipStatus: "Regular",
    checkIn: "May 5, 2025",
    checkOut: "May 8, 2025",
    room: "Pending",
    lastStay: "Jan 10, 2025",
    visits: 3
  },
  {
    id: "G006",
    name: "David Wilson",
    email: "david@example.com",
    phone: "567-890-1234",
    nationality: "France",
    vipStatus: "Gold",
    checkIn: "May 7, 2025",
    checkOut: "May 12, 2025",
    room: "Pending",
    lastStay: "Feb 8, 2025",
    visits: 6
  },
  {
    id: "G007",
    name: "Robert Martinez",
    email: "robert@example.com",
    phone: "789-012-3456",
    nationality: "Spain",
    vipStatus: "Gold",
    checkIn: "May 8, 2025",
    checkOut: "May 15, 2025",
    room: "Pending",
    lastStay: "Apr 22, 2025",
    visits: 4
  }
];

// Sample data for customer profiles
const profiles = [
  {
    id: "G001",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "123-456-7890",
    nationality: "United States",
    dob: "1985-03-15",
    preferredPayment: "Credit Card",
    preferredRoom: "Standard Double",
    notes: "Prefers high floor, away from elevator",
    totalStays: 2,
    vipStatus: "Regular"
  },
  {
    id: "G003",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "345-678-9012",
    nationality: "United Kingdom",
    dob: "1978-07-22",
    preferredPayment: "Credit Card",
    preferredRoom: "Standard Twin",
    notes: "Allergic to feather pillows",
    totalStays: 5,
    vipStatus: "Gold"
  },
  {
    id: "G004",
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "456-789-0123",
    nationality: "Australia",
    dob: "1990-11-05",
    preferredPayment: "Credit Card",
    preferredRoom: "Deluxe Double",
    notes: "Early check-in preferred when available",
    totalStays: 8,
    vipStatus: "Platinum"
  },
  {
    id: "G006",
    name: "David Wilson",
    email: "david@example.com",
    phone: "567-890-1234",
    nationality: "France",
    dob: "1982-12-10",
    preferredPayment: "Bank Transfer",
    preferredRoom: "Junior Suite",
    notes: "Prefers rooms with city view",
    totalStays: 6,
    vipStatus: "Gold"
  },
  {
    id: "G007",
    name: "Robert Martinez",
    email: "robert@example.com",
    phone: "789-012-3456",
    nationality: "Spain",
    dob: "1975-05-20",
    preferredPayment: "Credit Card",
    preferredRoom: "Executive Suite",
    notes: "Speaks limited English, prefers Spanish",
    totalStays: 4,
    vipStatus: "Gold"
  }
];

export default function Guests() {
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter guests based on search term and active tab
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.vipStatus.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Only show guests with a current or upcoming stay in the "Current" tab
    if (activeTab === "current") {
      return matchesSearch && guest.room !== "Checked Out";
    }
    
    return matchesSearch;
  });
  
  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.vipStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuest = () => {
    toast({
      title: "Guest Added",
      description: "New guest has been added successfully."
    });
  };

  const handleViewProfile = (guestId: string) => {
    setActiveTab("profiles");
    toast({
      title: "Profile Loaded",
      description: `Viewing profile for guest ${guestId}`
    });
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Guest Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              New Guest
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
              <DialogDescription>
                Enter guest information to create a new guest profile
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="First name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Last name" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Email address" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="Phone number" />
              </div>
              <div>
                <label className="text-sm font-medium">Nationality</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="es">Spain</SelectItem>
                    <SelectItem value="it">Italy</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium">Notes/Preferences</label>
                <Input placeholder="Special requests or preferences" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddGuest}>Create Guest</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current & Upcoming Guests</TabsTrigger>
          <TabsTrigger value="profiles">Guest Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current & Upcoming Guests</CardTitle>
              <CardDescription>Manage guests currently staying or with upcoming reservations</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests by name, email, room or VIP status..."
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
                      <TableHead>Name</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>{guest.room}</TableCell>
                        <TableCell>{guest.email}</TableCell>
                        <TableCell>{guest.checkIn}</TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            guest.vipStatus === "Regular" 
                              ? "bg-gray-100 text-gray-800" 
                              : guest.vipStatus === "Gold"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-purple-100 text-purple-800"
                          }`}>
                            {guest.vipStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProfile(guest.id)}
                          >
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profiles">
          <Card>
            <CardHeader>
              <CardTitle>Guest Profiles</CardTitle>
              <CardDescription>View and manage customer profiles and preferences</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search profiles by name, email or status..."
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
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Preferred Room</TableHead>
                      <TableHead>Total Stays</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">{profile.name}</TableCell>
                        <TableCell>{profile.email}</TableCell>
                        <TableCell>{profile.phone}</TableCell>
                        <TableCell>{profile.nationality}</TableCell>
                        <TableCell>{profile.preferredRoom}</TableCell>
                        <TableCell>{profile.totalStays}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            profile.vipStatus === "Regular" 
                              ? "bg-gray-100 text-gray-800" 
                              : profile.vipStatus === "Gold"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-purple-100 text-purple-800"
                          }`}>
                            {profile.vipStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
