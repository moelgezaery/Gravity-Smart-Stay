
import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const GuestCheckIn: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    roomNumber: "",
    adults: "1",
    children: "0",
    checkInDate: "",
    checkOutDate: "",
    paymentMethod: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    console.log("Check-in data:", formData);
    toast.success("Guest successfully checked in!");
    setIsDialogOpen(false);
    setFormData({
      guestName: "",
      email: "",
      phone: "",
      roomNumber: "",
      adults: "1",
      children: "0",
      checkInDate: "",
      checkOutDate: "",
      paymentMethod: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        <CardDescription>Common tasks and operations</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-20 flex flex-col items-center justify-center bg-hotel-blue-500 hover:bg-hotel-blue-600">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto mb-1"
                >
                  <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                  <path d="M12 18h.01" />
                </svg>
                <span>Check In</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Check In</DialogTitle>
              <DialogDescription>
                Enter the guest details to complete check-in.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="guestName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="roomNumber" className="text-right">
                    Room
                  </Label>
                  <Select
                    value={formData.roomNumber}
                    onValueChange={(value) => handleSelectChange("roomNumber", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="101">Room 101 - Single</SelectItem>
                      <SelectItem value="105">Room 105 - Deluxe</SelectItem>
                      <SelectItem value="202">Room 202 - Double</SelectItem>
                      <SelectItem value="301">Room 301 - Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Guests</Label>
                  <div className="col-span-3 flex gap-4">
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="adults" className="text-right text-xs">
                        Adults
                      </Label>
                      <Select
                        value={formData.adults}
                        onValueChange={(value) => handleSelectChange("adults", value)}
                      >
                        <SelectTrigger className="col-span-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-2">
                      <Label htmlFor="children" className="text-right text-xs">
                        Children
                      </Label>
                      <Select
                        value={formData.children}
                        onValueChange={(value) => handleSelectChange("children", value)}
                      >
                        <SelectTrigger className="col-span-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="checkInDate" className="text-right">
                    Check In
                  </Label>
                  <Input
                    id="checkInDate"
                    name="checkInDate"
                    type="date"
                    value={formData.checkInDate}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="checkOutDate" className="text-right">
                    Check Out
                  </Label>
                  <Input
                    id="checkOutDate"
                    name="checkOutDate"
                    type="date"
                    value={formData.checkOutDate}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paymentMethod" className="text-right">
                    Payment
                  </Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Complete Check In</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center border-dashed border-hotel-blue-300 text-hotel-blue-700"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-1"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
            <span>Check Out</span>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default GuestCheckIn;
