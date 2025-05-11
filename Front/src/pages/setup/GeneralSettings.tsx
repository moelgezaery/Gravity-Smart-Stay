
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Key, UserCog, Mail, Calendar, Building2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GeneralSettings = () => {
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
          <h1 className="text-3xl font-bold text-navy-500">{t("generalSettings")}</h1>
          <p className="text-muted-foreground mt-1">{t("settingsDescription")}</p>
        </div>
      </div>
      
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <TabsTrigger value="account" className="flex gap-2 items-center">
            <UserCog className="h-4 w-4" /> {t("account")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Key className="h-4 w-4" /> {t("security")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Mail className="h-4 w-4" /> {t("notifications")}
          </TabsTrigger>
          <TabsTrigger value="dateTime" className="flex gap-2 items-center">
            <Clock className="h-4 w-4" /> {t("dateTime")}
          </TabsTrigger>
          <TabsTrigger value="system" className="flex gap-2 items-center">
            <Settings className="h-4 w-4" /> {t("system")}
          </TabsTrigger>
          <TabsTrigger value="hotel" className="flex gap-2 items-center">
            <Building2 className="h-4 w-4" /> {t("hotel")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{t("account")}</CardTitle>
              <CardDescription>{t("accountDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
                    JS
                  </div>
                  <div>
                    <h3 className="font-semibold">John Smith</h3>
                    <p className="text-sm text-muted-foreground">Administrator</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Button>{t("editProfile")}</Button>
                  <Button variant="outline">{t("changePassword")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t("security")}</CardTitle>
              <CardDescription>{t("securityDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("comingSoon")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("notifications")}</CardTitle>
              <CardDescription>{t("notificationsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("comingSoon")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dateTime">
          <Card>
            <CardHeader>
              <CardTitle>{t("dateTime")}</CardTitle>
              <CardDescription>{t("dateTimeDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("comingSoon")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>{t("system")}</CardTitle>
              <CardDescription>{t("systemDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("comingSoon")}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotel">
          <Card>
            <CardHeader>
              <CardTitle>{t("hotel")}</CardTitle>
              <CardDescription>{t("hotelSettingsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t("comingSoon")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default GeneralSettings;
