
import { RoomCard } from "./RoomCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

interface Room {
  roomNumber: string;
  type: string;
  status: "vacant" | "occupied" | "reserved" | "cleaning" | "maintenance" | "checkout";
  guest?: string;
  checkIn?: string;
  checkOut?: string;
}

interface FloorSectionProps {
  floorNumber: string;
  rooms: Room[];
  onRoomClick: (roomNumber: string) => void;
}

export function FloorSection({ floorNumber, rooms, onRoomClick }: FloorSectionProps) {
  const { toast } = useToast();

  const handleViewRoom = (roomNumber: string) => {
    onRoomClick(roomNumber);
    toast({
      title: "Room Details",
      description: `Viewing details for room ${roomNumber}`
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Floor {floorNumber}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard 
              key={room.roomNumber}
              roomNumber={room.roomNumber}
              roomType={room.type}
              status={room.status}
              guest={room.guest}
              checkIn={room.checkIn}
              checkOut={room.checkOut}
              onViewDetails={() => handleViewRoom(room.roomNumber)}
            />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center py-8">No rooms match the current filters</p>
        )}
      </div>
    </div>
  );
}
