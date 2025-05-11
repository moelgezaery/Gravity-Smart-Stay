
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MaintenanceSetup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-4" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-navy-500">{t("maintenanceSetup")}</h1>
          <p className="text-muted-foreground mt-1">{t("maintenanceDescription")}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("maintenanceSetup")}</CardTitle>
          <CardDescription>{t("maintenanceDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{t("comingSoon")}</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default MaintenanceSetup;
