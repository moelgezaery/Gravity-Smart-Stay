
import React, { useState } from "react";
import { rooms, Room } from "@/utils/mockData";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoomStatus: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [floorFilter, setFloorFilter] = useState<string>("all");

  const getFilteredRooms = () => {
    let filteredRooms = [...rooms];
    
    if (filter !== "all") {
      filteredRooms = filteredRooms.filter(room => room.status.toLowerCase() === filter);
    }
    
    if (floorFilter !== "all") {
      filteredRooms = filteredRooms.filter(room => room.floor === parseInt(floorFilter));
    }
    
    return filteredRooms;
  };

  const getStatusClassName = (status: string): string => {
    switch (status.toLowerCase()) {
      case "available":
        return "status-available";
      case "occupied":
        return "status-occupied";
      case "cleaning":
        return "status-cleaning";
      case "maintenance":
        return "status-maintenance";
      default:
        return "";
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Room Status</CardTitle>
        <div className="flex space-x-2">
          <Select value={floorFilter} onValueChange={setFloorFilter}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue placeholder="Floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              <SelectItem value="1">Floor 1</SelectItem>
              <SelectItem value="2">Floor 2</SelectItem>
              <SelectItem value="3">Floor 3</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {getFilteredRooms().map((room) => (
            <div key={room.id} className="bg-white border rounded-md p-3 transition-all hover:shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Room {room.number}</span>
                <span className={getStatusClassName(room.status)}>
                  {room.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <div>{room.type}</div>
                <div>Floor {room.floor}</div>
                <div>${room.price}/night</div>
              </div>
              {room.currentGuest && (
                <div className="mt-2 text-xs text-gray-500 border-t pt-2">
                  <span className="block truncate" title={room.currentGuest}>
                    {room.currentGuest}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomStatus;
