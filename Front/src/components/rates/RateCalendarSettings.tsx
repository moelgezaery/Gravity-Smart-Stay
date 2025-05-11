
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface RoomType {
  id: number;
  name: string;
}

interface RateCalendarSettingsProps {
  selectedMonth: string;
  setSelectedMonth: (value: string) => void;
  roomTypes: RoomType[];
}

export const RateCalendarSettings = ({ selectedMonth, setSelectedMonth, roomTypes }: RateCalendarSettingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div className="space-y-2">
        <Label>{t("selectMonth")}</Label>
        <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                {new Date(2025, i, 1).toLocaleString('default', { month: 'long' })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>{t("roomTypes")}</Label>
        <Select defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Room Types</SelectItem>
            {roomTypes.map(room => (
              <SelectItem key={room.id} value={room.id.toString()}>{room.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button variant="outline">{t("applyToAllRooms")}</Button>
      <Button>{t("bulkUpdate")}</Button>
    </div>
  );
};
