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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Plus, Search, Shield, Pencil, Trash, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock users data
const users = [
  {
    id: "U001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    department: "Management",
    status: "Active",
    lastLogin: "4 hours ago"
  },
  {
    id: "U002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Manager",
    department: "Front Office",
    status: "Active",
    lastLogin: "1 day ago"
  },
  {
    id: "U003",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    role: "Staff",
    department: "Housekeeping",
    status: "Active",
    lastLogin: "2 hours ago"
  },
  {
    id: "U004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "Staff",
    department: "Restaurant",
    status: "Inactive",
    lastLogin: "1 month ago"
  },
  {
    id: "U005",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Manager",
    department: "Maintenance",
    status: "Active",
    lastLogin: "12 hours ago"
  }
];

// Updated mock roles data aligned with new navigation categories
const roles = [
  {
    id: "R001",
    name: "Admin",
    description: "Full access to all system features and settings",
    users: 1,
    permissions: [
      "front_Office",
      "room_status",
      "guest_Concierge",
      "financial",
      "analytics",
      "system_config"
    ]
  },
  {
    id: "R002",
    name: "Manager",
    description: "Access to most system features except critical settings",
    users: 2,
    permissions: [
      "front_Office",
      "room_status",
      "guest_Concierge",
      "financial",
      "analytics"
    ]
  },
  {
    id: "R003",
    name: "Front Desk",
    description: "Access to front desk operations, check-ins, check-outs, and guest information",
    users: 5,
    permissions: [
      "front_Office",
      "room_status",
      "guest_Concierge"
    ]
  },
  {
    id: "R004",
    name: "Housekeeping",
    description: "Access to room status and housekeeping tasks",
    users: 8,
    permissions: [
      "room_status"
    ]
  }
];

// Updated permissions categories to match navigation structure
const permissionCategories = [
  {
    name: "Front Office / Reception",
    key: "front_Office",
    permissions: [
      { id: "view_reservations", name: "View Reservations" },
      { id: "manage_reservations", name: "Manage Reservations" },
      { id: "view_arrivals", name: "View Arrivals" },
      { id: "view_departures", name: "View Departures" },
      { id: "view_cancellations", name: "View Cancellations" },
      { id: "check_in_guests", name: "Check-in Guests" },
      { id: "check_out_guests", name: "Check-out Guests" },
      { id: "manage_guest_requests", name: "Manage Guest Requests" },
      { id: "view_guest_profiles", name: "View Guest Profiles" },
      { id: "edit_guest_profiles", name: "Edit Guest Profiles" }
    ]
  },
  {
    name: "Room Status & Housekeeping",
    key: "room_status",
    permissions: [
      { id: "view_rooms", name: "View Rooms" },
      { id: "manage_housekeeping", name: "Manage Housekeeping" },
      { id: "update_room_status", name: "Update Room Status" }
    ]
  },
  {
    name: "  Guest Services & Concierge",
    key: "guest_Concierge",
    permissions: [
      { id: "manage_guest_requests", name: "Manage Guest Requests" },
     
    ]
  },
  {
    name: "Financial Overview",
    key: "financial",
    permissions: [
      { id: "process_payments", name: "Process Payments" },
      { id: "manage_invoices", name: "Manage Invoices" },
      { id: "add_charges", name: "Add Charges" },
      { id: "view_financial_reports", name: "View Financial Reports" },
      { id: "close_day", name: "Close Day" }
    ]
  },
  {
    name: "Analytics & Reports",
    key: "analytics",
    permissions: [
      { id: "view_reports", name: "View Reports" },
      { id: "generate_reports", name: "Generate Reports" },
      { id: "export_data", name: "Export Data" }
    ]
  },
  {
    name: "System Configuration",
    key: "system_config",
    permissions: [
      { id: "manage_users", name: "Manage Users" },
      { id: "manage_roles", name: "Manage Roles" },
      { id: "system_settings", name: "System Settings" },
      { id: "view_audit_logs", name: "View Audit Logs" }
    ]
  }
];

export default function UsersPermissions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditRole = (role: any) => {
    setCurrentRole(role);
    setSelectedPermissions(role.permissions);
    setEditMode(true);
  };
  
  const handleCancelEdit = () => {
    setCurrentRole(null);
    setSelectedPermissions([]);
    setEditMode(false);
  };
  
  const handleTogglePermission = (permissionId: string) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter(id => id !== permissionId));
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
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
        <h1 className="text-3xl font-bold">Users & Permissions</h1>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-semibold">{users.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-semibold">{users.filter(user => user.status === "Active").length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User Roles</p>
                  <p className="text-2xl font-semibold">{roles.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>System Users</CardTitle>
                <CardDescription>Manage user accounts and access rights</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-10 w-full md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge className={user.status === "Active" ? "bg-green-500" : "bg-gray-500"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
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
        
        <TabsContent value="roles" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Roles</CardTitle>
                    <CardDescription>Manage roles and their permissions</CardDescription>
                  </div>
                  <Button onClick={() => setEditMode(false)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Role
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.id}</TableCell>
                          <TableCell>{role.name}</TableCell>
                          <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                          <TableCell>{role.users}</TableCell>
                          <TableCell>{role.permissions.length}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
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
                  <CardTitle>{editMode ? `Edit ${currentRole?.name} Role` : 'Add New Role'}</CardTitle>
                  <CardDescription>
                    {editMode ? 'Update role and its permissions' : 'Create a new role with specific permissions'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="roleName" className="text-sm font-medium">Role Name</label>
                    <Input 
                      id="roleName" 
                      placeholder="e.g. Front Desk Staff" 
                      defaultValue={editMode ? currentRole?.name : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="roleDescription" className="text-sm font-medium">Description</label>
                    <Input 
                      id="roleDescription" 
                      placeholder="Brief description of this role" 
                      defaultValue={editMode ? currentRole?.description : ''}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Permissions</label>
                    <div className="border rounded-md p-4 space-y-4">
                      {permissionCategories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <h4 className="text-sm font-semibold">{category.name}</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {category.permissions.map((permission) => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={permission.id}
                                  checked={selectedPermissions.includes(permission.id)}
                                  onCheckedChange={() => handleTogglePermission(permission.id)}
                                />
                                <label
                                  htmlFor={permission.id}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {permission.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                  <Button>{editMode ? 'Update' : 'Save'} Role</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="permissions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>
                Review all system permissions by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {permissionCategories.map((category) => (
                <div key={category.name} className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.permissions.map((permission) => (
                      <Card key={permission.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{permission.name}</h4>
                              <p className="text-sm text-muted-foreground">{permission.id}</p>
                            </div>
                            <Badge variant="outline">
                              {roles.filter(role => 
                                role.permissions.includes(permission.id)
                              ).length} Roles
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
