
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RoomType {
  id: number;
  name: string;
  baseRate: number;
  maxAdults: number;
  maxChildren: number;
  extraAdultCharge: number;
  extraChildCharge: number;
  childrenAgeLimit: number;
}

interface BaseRatesProps {
  roomTypes: RoomType[];
}

export const BaseRates = ({ roomTypes }: BaseRatesProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("baseRates")}</CardTitle>
        <CardDescription>{t("baseRatesDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {roomTypes.map((roomType) => (
          <div key={roomType.id} className="border-b pb-4 last:border-0">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{roomType.name}</h3>
              <div className="flex items-center gap-2">
                <Label htmlFor={`rate-${roomType.id}`}>{t("baseRate")}:</Label>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                  <Input 
                    id={`rate-${roomType.id}`}
                    type="number" 
                    defaultValue={roomType.baseRate} 
                    className="w-24" 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("breakfast")}</span>
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                  <Input type="number" defaultValue="25" className="w-20 h-7" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("lateCheckout")}</span>
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                  <Input type="number" defaultValue="30" className="w-20 h-7" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{t("extraBed")}</span>
                <div className="flex items-center">
                  <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                  <Input type="number" defaultValue="40" className="w-20 h-7" />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button variant="outline">{t("saveChanges")}</Button>
      </CardContent>
    </Card>
  );
};
