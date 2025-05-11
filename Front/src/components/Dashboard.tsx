
import React from "react";
import BookingStats from "@/components/BookingStats";
import RoomStatus from "@/components/RoomStatus";
import RecentBookings from "@/components/RecentBookings";
import GuestCheckIn from "@/components/GuestCheckIn";

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to Smart Stay Hotel Management System</p>
      </div>

      <BookingStats />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GuestCheckIn />
        <RoomStatus />
      </div>

      <RecentBookings />
    </div>
  );
};

export default Dashboard;
