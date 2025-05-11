
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
import { Building, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for companies
const companies = [
  {
    id: "C001",
    name: "Alpha Enterprises",
    contactPerson: "John Smith",
    email: "john@alphaenterprises.com",
    phone: "555-123-4567",
    address: "123 Business Ave, Suite 500, New York, NY 10001",
    contractStatus: "Active",
    notes: "Corporate rate agreement in place until December 2025"
  },
  {
    id: "C002",
    name: "Beta Corporation",
    contactPerson: "Sarah Johnson",
    email: "sarah@betacorp.com",
    phone: "555-234-5678",
    address: "456 Industry Blvd, Chicago, IL 60601",
    contractStatus: "Active",
    notes: "Monthly billing arrangement, special rates for executives"
  },
  {
    id: "C003",
    name: "Gamma Technologies",
    contactPerson: "Michael Chen",
    email: "michael@gammatech.com",
    phone: "555-345-6789",
    address: "789 Innovation Way, San Francisco, CA 94105",
    contractStatus: "Inactive",
    notes: "Previous contract expired, pending renewal discussions"
  },
  {
    id: "C004",
    name: "Delta Services",
    contactPerson: "Emily Davis",
    email: "emily@deltaservices.com",
    phone: "555-456-7890",
    address: "321 Corporate Drive, Austin, TX 78701",
    contractStatus: "Active",
    notes: "Frequent business travelers, shuttle service included"
  },
  {
    id: "C005",
    name: "Epsilon Consulting",
    contactPerson: "Robert Wilson",
    email: "robert@epsilonconsulting.com",
    phone: "555-567-8901",
    address: "654 Consultant Row, Boston, MA 02110",
    contractStatus: "Pending",
    notes: "New agreement being negotiated, awaiting final approval"
  }
];

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter companies based on search term
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contractStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCompany = () => {
    toast({
      title: "Company Added",
      description: "New company has been created successfully."
    });
  };

  const handleViewDetails = (companyId: string) => {
    toast({
      title: "Company Details",
      description: `Viewing details for company ${companyId}`
    });
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Corporate Clients</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Building className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Enter details for the new corporate client
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="companyName" className="text-right text-sm font-medium">
                  Company Name
                </label>
                <Input id="companyName" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contactPerson" className="text-right text-sm font-medium">
                  Contact Person
                </label>
                <Input id="contactPerson" className="col-span-3" />
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
                <label htmlFor="address" className="text-right text-sm font-medium">
                  Address
                </label>
                <Input id="address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="notes" className="text-right text-sm font-medium">
                  Notes
                </label>
                <Input id="notes" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCompany}>Create Company</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Corporate Accounts</CardTitle>
          <CardDescription>Manage your corporate clients and their reservations</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies by name, contact, email or status..."
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
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.contactPerson}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          company.contractStatus === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : company.contractStatus === "Inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {company.contractStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(company.id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
