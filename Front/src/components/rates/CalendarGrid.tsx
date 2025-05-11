
import React from "react";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface CalendarGridProps {
  calendarDays: Date[];
  rates: Record<string, number>;
  handleRateChange: (date: Date, newValue: string) => void;
}

export const CalendarGrid = ({ calendarDays, rates, handleRateChange }: CalendarGridProps) => {
  const { t } = useTranslation();
  
  const isWeekend = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };
  
  return (
    <>
      <div className="flex gap-2 mb-3">
        <Badge className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200">{t("standardRate")}: $100</Badge>
        <Badge className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200">{t("weekendRate")}: $120</Badge>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Day labels */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-sm p-2">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the month starts */}
        {Array.from({ length: calendarDays[0].getDay() }, (_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map(day => {
          const dateStr = day.toISOString().split('T')[0];
          return (
            <Card 
              key={dateStr} 
              className={`p-2 ${isWeekend(day) ? 'bg-muted/50' : ''}`}
            >
              <div className="text-center font-medium text-sm mb-2">
                {day.getDate()}
              </div>
              <div className="flex items-center justify-center">
                <DollarSign className="h-3 w-3 text-muted-foreground" />
                <Input
                  type="number"
                  value={rates[dateStr] || 0}
                  onChange={(e) => handleRateChange(day, e.target.value)}
                  className="h-7 w-16 text-center"
                />
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};
