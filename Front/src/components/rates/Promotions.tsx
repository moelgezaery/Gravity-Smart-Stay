
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Promotion {
  id: number;
  name: string;
  type: "percentage" | "fixed" | "package";
  value: number;
  conditions: string;
}

interface PromotionsProps {
  promotions: Promotion[];
}

export const Promotions = ({ promotions }: PromotionsProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("promotions")}</CardTitle>
          <CardDescription>{t("promotionsDescription")}</CardDescription>
        </div>
        <Button size="sm">{t("addPromotion")}</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{promo.name}</h3>
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">{promo.conditions}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  {promo.type === 'percentage' && <span>{promo.value}%</span>}
                  {promo.type === 'fixed' && <span>${promo.value}</span>}
                  {promo.type === 'package' && <span>+${promo.value}</span>}
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
