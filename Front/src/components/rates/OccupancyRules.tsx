
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Info, DollarSign } from "lucide-react";
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

interface OccupancyRulesProps {
  roomTypes: RoomType[];
}

export const OccupancyRules = ({ roomTypes }: OccupancyRulesProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("occupancyRules")}</CardTitle>
        <CardDescription>{t("occupancyRulesDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roomTypes.map((roomType) => (
            <div key={roomType.id} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{roomType.name}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label className="text-base">{t("maxAdults")}</Label>
                    <span className="font-medium">{roomType.maxAdults}</span>
                  </div>
                  <div className="pl-4">
                    <Slider 
                      defaultValue={[roomType.maxAdults]} 
                      max={6} 
                      step={1} 
                      className="mb-2"
                    />
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Label className="text-base">{t("maxChildren")}</Label>
                    <span className="font-medium">{roomType.maxChildren}</span>
                  </div>
                  <div className="pl-4">
                    <Slider 
                      defaultValue={[roomType.maxChildren]} 
                      max={4} 
                      step={1} 
                      className="mb-2"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Label className="text-base">{t("childrenAgeLimit")}</Label>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        defaultValue={roomType.childrenAgeLimit} 
                        className="w-16 text-right" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">{t("extraAdultCharge")}</Label>
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        defaultValue={roomType.extraAdultCharge} 
                        className="w-24" 
                      />
                      <span className="ml-2 text-muted-foreground text-sm">per night</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label className="text-base">{t("extraChildCharge")}</Label>
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        defaultValue={roomType.extraChildCharge} 
                        className="w-24" 
                      />
                      <span className="ml-2 text-muted-foreground text-sm">per night</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <Label className="text-base mb-1 block">{t("includeBreakfast")}</Label>
                      <p className="text-sm text-muted-foreground">For all guests including extra guests</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-muted/50 p-4 rounded-md flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">{t("occupancyPolicies")}:</p>
                  <p>Children under {roomType.childrenAgeLimit} stay free when using existing bedding. Extra bed charges may apply.</p>
                </div>
              </div>
            </div>
          ))}
          
          <Button>{t("saveChanges")}</Button>
        </div>
      </CardContent>
    </Card>
  );
};
