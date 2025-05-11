
import React from "react";
import { useTranslation } from "react-i18next";

export const BookingEnginePreview = () => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-6 p-4 border rounded-md bg-muted/20">
      <h3 className="font-medium mb-2">Booking Engine Preview</h3>
      <div className="border p-3 rounded-md bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Standard Room</p>
            <p className="text-xs text-muted-foreground">May 15-18, 2025 (3 nights)</p>
          </div>
          <div>
            <p className="text-sm">2 Adults, 1 Child (10)</p>
            <p className="text-xs text-muted-foreground">Base occupancy: 2 adults</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">$320.00</p>
            <p className="text-xs text-muted-foreground">$100 x 3 nights + $20 extra person</p>
          </div>
        </div>
      </div>
    </div>
  );
};
