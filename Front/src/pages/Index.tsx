
import { Layout } from "@/components/layout/Layout";
import { StatusFilters } from "@/components/dashboard/StatusFilters";
import { FloorSection } from "@/components/dashboard/FloorSection";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Mock data for demonstration
const mockRooms = [
  {
    floorNumber: "1",
    rooms: [
      { roomNumber: "101", type: "Standard Single", status: "vacant" as const },
      { roomNumber: "102", type: "Standard Double", status: "occupied" as const, guest: "Alex Johnson", checkIn: "May 2, 2025", checkOut: "May 5, 2025" },
      { roomNumber: "103", type: "Standard Double", status: "reserved" as const, guest: "Sarah Williams", checkIn: "May 5, 2025", checkOut: "May 8, 2025" },
      { roomNumber: "104", type: "Standard Twin", status: "cleaning" as const },
      { roomNumber: "105", type: "Deluxe Double", status: "maintenance" as const },
      { roomNumber: "106", type: "Junior Suite", status: "checkout" as const },
    ]
  },
  {
    floorNumber: "2",
    rooms: [
      { roomNumber: "201", type: "Standard Single", status: "vacant" as const },
      { roomNumber: "202", type: "Standard Double", status: "occupied" as const, guest: "Michael Brown", checkIn: "May 1, 2025", checkOut: "May 4, 2025" },
      { roomNumber: "203", type: "Standard Double", status: "vacant" as const },
      { roomNumber: "204", type: "Standard Twin", status: "occupied" as const, guest: "Emily Davis", checkIn: "May 3, 2025", checkOut: "May 10, 2025" },
      { roomNumber: "205", type: "Deluxe Double", status: "vacant" as const },
      { roomNumber: "206", type: "Junior Suite", status: "reserved" as const, guest: "David Wilson", checkIn: "May 7, 2025", checkOut: "May 12, 2025" },
    ]
  },
  {
    floorNumber: "3",
    rooms: [
      { roomNumber: "301", type: "Deluxe Single", status: "vacant" as const },
      { roomNumber: "302", type: "Deluxe Double", status: "occupied" as const, guest: "Jennifer Taylor", checkIn: "May 2, 2025", checkOut: "May 6, 2025" },
      { roomNumber: "303", type: "Executive Suite", status: "reserved" as const, guest: "Robert Martinez", checkIn: "May 8, 2025", checkOut: "May 15, 2025" },
      { roomNumber: "304", type: "Presidential Suite", status: "vacant" as const },
    ]
  },
];

const Index = () => {
  const { t } = useTranslation();
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
  };
  
  const navigate = useNavigate();
  
  const handleRoomDetailClick = (roomNumber: string) => {
    // Navigate to room details page with the room number as a parameter
    navigate(`/rooms?room=${roomNumber}`);
  };
  
  return (
    <Layout>
      <StatusFilters onFilterChange={handleFilterChange} />
      
      {mockRooms.map((floor) => (
        <FloorSection 
          key={floor.floorNumber} 
          floorNumber={floor.floorNumber} 
          rooms={floor.rooms} 
          onRoomClick={handleRoomDetailClick}
        />
      ))}
    </Layout>
  );
};

export default Index;
