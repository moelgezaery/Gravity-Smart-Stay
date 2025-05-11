
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CalendarGrid } from "./CalendarGrid";
import { BookingEnginePreview } from "./BookingEnginePreview";

interface RateCalendarProps {
  selectedMonth: number;
}

export const RateCalendar = ({ selectedMonth }: RateCalendarProps) => {
  const { t } = useTranslation();
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({});
  
  // Initialize with sample rates
  useEffect(() => {
    const year = 2025;
    // Get days in month
    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, selectedMonth, i + 1));
    setCalendarDays(days);
    
    // Create sample rates
    const initialRates: Record<string, number> = {};
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      const isWeekend = day.getDay() === 0 || day.getDay() === 6;
      // Higher rates for weekends
      initialRates[dateStr] = isWeekend ? 120 : 100;
    });
    setRates(initialRates);
  }, [selectedMonth]);
  
  const handleRateChange = (date: Date, newValue: string) => {
    const dateStr = date.toISOString().split('T')[0];
    const value = parseInt(newValue) || 0;
    setRates(prev => ({
      ...prev,
      [dateStr]: value
    }));
  };
  
  if (calendarDays.length === 0) {
    return <div>Loading calendar...</div>;
  }
  
  return (
    <div className="space-y-6">
      <CalendarGrid 
        calendarDays={calendarDays}
        rates={rates}
        handleRateChange={handleRateChange}
      />
      
      <BookingEnginePreview />
    </div>
  );
};
