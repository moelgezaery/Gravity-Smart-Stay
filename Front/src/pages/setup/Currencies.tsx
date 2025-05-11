
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Plus, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

// Mock currencies data
const currencies = [
  {
    id: "C001",
    name: "US Dollar",
    code: "USD",
    symbol: "$",
    exchangeRate: 1.00,
    default: true,
    active: true
  },
  {
    id: "C002",
    name: "Euro",
    code: "EUR",
    symbol: "€",
    exchangeRate: 0.92,
    default: false,
    active: true
  },
  {
    id: "C003",
    name: "British Pound",
    code: "GBP",
    symbol: "£",
    exchangeRate: 0.79,
    default: false,
    active: true
  },
  {
    id: "C004",
    name: "Japanese Yen",
    code: "JPY",
    symbol: "¥",
    exchangeRate: 149.54,
    default: false,
    active: true
  },
  {
    id: "C005",
    name: "Canadian Dollar",
    code: "CAD",
    symbol: "CA$",
    exchangeRate: 1.36,
    default: false,
    active: true
  },
  {
    id: "C006",
    name: "Australian Dollar",
    code: "AUD",
    symbol: "A$",
    exchangeRate: 1.51,
    default: false,
    active: false
  }
];

export default function Currencies() {
  const [editMode, setEditMode] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<any>(null);
  
  const handleEditCurrency = (currency: any) => {
    setCurrentCurrency(currency);
    setEditMode(true);
  };
  
  const handleCancelEdit = () => {
    setCurrentCurrency(null);
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
        <h1 className="text-3xl font-bold">Currency Setup</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Currencies</CardTitle>
                <CardDescription>Manage currencies and exchange rates</CardDescription>
              </div>
              <Button onClick={() => setEditMode(false)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Currency
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Exchange Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencies.map((currency) => (
                    <TableRow key={currency.id}>
                      <TableCell className="font-medium">{currency.name}</TableCell>
                      <TableCell>{currency.code}</TableCell>
                      <TableCell>{currency.symbol}</TableCell>
                      <TableCell>{currency.exchangeRate.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={currency.active ? "bg-green-500" : "bg-gray-500"}>
                          {currency.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {currency.default ? (
                          <Badge className="bg-blue-500">Default</Badge>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCurrency(currency)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={currency.default}>
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
              <CardTitle>{editMode ? `Edit ${currentCurrency?.name}` : 'Add New Currency'}</CardTitle>
              <CardDescription>
                {editMode ? 'Update currency details and exchange rate' : 'Define a new currency for your hotel'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currencyName" className="text-sm font-medium">Currency Name</label>
                <Input 
                  id="currencyName" 
                  placeholder="e.g. US Dollar" 
                  defaultValue={editMode ? currentCurrency?.name : ''}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="currencyCode" className="text-sm font-medium">Currency Code</label>
                  <Input 
                    id="currencyCode" 
                    placeholder="e.g. USD" 
                    defaultValue={editMode ? currentCurrency?.code : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="currencySymbol" className="text-sm font-medium">Symbol</label>
                  <Input 
                    id="currencySymbol" 
                    placeholder="e.g. $" 
                    defaultValue={editMode ? currentCurrency?.symbol : ''}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="exchangeRate" className="text-sm font-medium">Exchange Rate</label>
                <Input 
                  id="exchangeRate" 
                  type="number" 
                  step="0.0001" 
                  min="0" 
                  placeholder="Exchange rate relative to base currency" 
                  defaultValue={editMode ? currentCurrency?.exchangeRate : ''}
                />
                <p className="text-xs text-muted-foreground">Exchange rate relative to USD (1 USD = X)</p>
              </div>
              
              <div className="flex items-center justify-between space-x-2 pt-2">
                <label htmlFor="isActive" className="text-sm font-medium">Active</label>
                <Switch 
                  id="isActive" 
                  defaultChecked={editMode ? currentCurrency?.active : true} 
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <label htmlFor="isDefault" className="text-sm font-medium">Set as Default Currency</label>
                  <p className="text-xs text-muted-foreground">
                    This will replace the current default currency (USD)
                  </p>
                </div>
                <Switch 
                  id="isDefault" 
                  defaultChecked={editMode ? currentCurrency?.default : false}
                  disabled={editMode && currentCurrency?.default}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button>{editMode ? 'Update' : 'Save'} Currency</Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Exchange Rate Updates</CardTitle>
              <CardDescription>
                Configure automatic exchange rate updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <label className="text-sm font-medium">Enable Automatic Updates</label>
                  <p className="text-xs text-muted-foreground">
                    Updates exchange rates daily using an external API
                  </p>
                </div>
                <Switch id="autoUpdate" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">API Key</label>
                <Input id="apiKey" type="password" placeholder="Your exchange rate API key" />
              </div>
              
              <Button variant="outline" className="w-full">Test Connection</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
