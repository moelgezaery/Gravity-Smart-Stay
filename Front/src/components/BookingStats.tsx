
import React from "react";
import { hotelStats } from "@/utils/mockData";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BedDouble, CalendarIcon, HotelIcon } from "lucide-react";

const BookingStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Occupancy Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          <BedDouble className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{hotelStats.occupancyRate}%</div>
          <Progress value={hotelStats.occupancyRate} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {hotelStats.totalRooms - hotelStats.availableRooms} of {hotelStats.totalRooms} rooms occupied
          </p>
        </CardContent>
      </Card>

      {/* Today's Check-ins/outs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Today's Activity</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">{hotelStats.checkInsToday}</div>
              <p className="text-xs text-muted-foreground">Check-ins</p>
            </div>
            <div className="border-r border-gray-200 h-10"></div>
            <div>
              <div className="text-2xl font-bold">{hotelStats.checkOutsToday}</div>
              <p className="text-xs text-muted-foreground">Check-outs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <HotelIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${hotelStats.revenue.today}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Today's revenue
          </p>
          <div className="flex justify-between mt-4 text-xs">
            <div>
              <p className="font-semibold">${hotelStats.revenue.thisWeek}</p>
              <p className="text-muted-foreground">This Week</p>
            </div>
            <div>
              <p className="font-semibold">${hotelStats.revenue.thisMonth}</p>
              <p className="text-muted-foreground">This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStats;
