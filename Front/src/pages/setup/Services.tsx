
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Mock service data
const initialServices = [
  { id: 1, name: "Room Cleaning", price: 25.00, description: "Standard room cleaning service" },
  { id: 2, name: "Breakfast", price: 15.00, description: "Continental breakfast" },
  { id: 3, name: "Laundry", price: 10.00, description: "Per kg of clothes" },
  { id: 4, name: "Airport Shuttle", price: 50.00, description: "One-way airport transfer" },
  { id: 5, name: "Spa Access", price: 35.00, description: "Full day access to spa facilities" }
];

interface Service {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function Services() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    price: 0,
    description: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddService = () => {
    const id = Math.max(0, ...services.map(s => s.id)) + 1;
    setServices([...services, { id, ...newService }]);
    setNewService({ name: '', price: 0, description: '' });
  };

  const handleEditService = (id: number) => {
    setEditingId(id);
    const service = services.find(s => s.id === id);
    if (service) {
      setNewService({
        name: service.name,
        price: service.price,
        description: service.description
      });
    }
  };

  const handleUpdateService = () => {
    if (editingId === null) return;
    
    setServices(services.map(service => 
      service.id === editingId 
        ? { ...service, ...newService }
        : service
    ));
    
    setEditingId(null);
    setNewService({ name: '', price: 0, description: '' });
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <Layout>
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold">{t("services")}</h1>
        <p className="text-muted-foreground">{t("settingsMenu")}</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{editingId === null ? t("add") : t("edit")} {t("services").toLowerCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">{t("name")}</label>
                <Input 
                  value={newService.name} 
                  onChange={e => setNewService({ ...newService, name: e.target.value })}
                  placeholder={t("name")}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">{t("price")}</label>
                <Input 
                  type="number"
                  value={newService.price} 
                  onChange={e => setNewService({ ...newService, price: parseFloat(e.target.value) || 0 })}
                  placeholder={t("price")}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">{t("description")}</label>
                <Input 
                  value={newService.description} 
                  onChange={e => setNewService({ ...newService, description: e.target.value })}
                  placeholder={t("description")}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={editingId === null ? handleAddService : handleUpdateService}
                disabled={!newService.name}
              >
                {editingId === null ? (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> {t("add")}
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" /> {t("save")}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>{t("services")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("price")}</TableHead>
                  <TableHead>{t("description")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>${service.price.toFixed(2)}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditService(service.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
