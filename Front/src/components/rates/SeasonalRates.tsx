
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

interface SeasonalAdjustment {
  id: number;
  name: string;
  adjustment: number;
  startDate: string;
  endDate: string;
}

interface SeasonalRatesProps {
  seasonalAdjustments: SeasonalAdjustment[];
}

export const SeasonalRates = ({ seasonalAdjustments }: SeasonalRatesProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("seasonal")}</CardTitle>
          <CardDescription>{t("seasonalDescription")}</CardDescription>
        </div>
        <Button size="sm">{t("addSeasonal")}</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {seasonalAdjustments.map((season) => (
            <div key={season.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <h3 className="font-semibold">{season.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {season.startDate} - {season.endDate}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Label htmlFor={`adjustment-${season.id}`} className="mr-2">{t("adjustment")}</Label>
                  <div className="flex items-center">
                    <Input 
                      id={`adjustment-${season.id}`}
                      type="number" 
                      defaultValue={season.adjustment} 
                      className="w-16 text-right" 
                    />
                    <span className="ml-1">%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">{t("edit")}</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
