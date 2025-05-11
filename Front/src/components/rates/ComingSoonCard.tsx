
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface ComingSoonCardProps {
  title: string;
  description: string;
}

export const ComingSoonCard = ({ title, description }: ComingSoonCardProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t(title)}</CardTitle>
        <CardDescription>{t(description)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{t("comingSoon")}</p>
      </CardContent>
    </Card>
  );
};
