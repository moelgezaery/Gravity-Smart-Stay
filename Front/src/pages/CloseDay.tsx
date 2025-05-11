
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CreditCard, FileText, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CloseDay = () => {
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
          <h1 className="text-3xl font-bold text-navy-500">{t("closeDay")}</h1>
          <p className="text-muted-foreground mt-1">{t("closeDayDescription")}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("dailySummary")}</CardTitle>
            <CardDescription>{t("dailySummaryDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span>{t("totalCheckins")}</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>{t("totalCheckouts")}</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>{t("totalRevenue")}</span>
              <span className="font-medium">$2,450.00</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>{t("occupancyRate")}</span>
              <span className="font-medium">78%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("closeDayOperation")}</CardTitle>
            <CardDescription>{t("closeDayWarning")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
              <p className="text-yellow-800 text-sm">{t("closeDayConfirmation")}</p>
            </div>
            
            <ul className="space-y-2">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{t("allPaymentsProcessed")}</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{t("allReservationsUpdated")}</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{t("dailyReportGenerated")}</span>
              </li>
            </ul>
            
            <Button className="w-full mt-4">{t("closeDayButton")}</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("recentDailyReports")}</CardTitle>
            <CardDescription>{t("recentDailyReportsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (index + 1));
                
                return (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{date.toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{t("totalRevenue")}: $1,850.00</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">{t("viewReport")}</Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CloseDay;
