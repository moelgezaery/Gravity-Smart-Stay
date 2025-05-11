
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Calendar, DollarSign, Percent, Users, 
  LineChart, Building2, User 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RateCalendar } from "@/components/rates/RateCalendar";
import { BaseRates } from "@/components/rates/BaseRates";
import { SeasonalRates } from "@/components/rates/SeasonalRates";
import { Promotions } from "@/components/rates/Promotions";
import { RateCalendarSettings } from "@/components/rates/RateCalendarSettings";
import { OccupancyRules } from "@/components/rates/OccupancyRules";
import { ComingSoonCard } from "@/components/rates/ComingSoonCard";

// Mock data for room types
const roomTypes = [
  { id: 1, name: "Standard Room", baseRate: 100, maxAdults: 2, maxChildren: 1, extraAdultCharge: 20, extraChildCharge: 0, childrenAgeLimit: 12 },
  { id: 2, name: "Deluxe Room", baseRate: 150, maxAdults: 2, maxChildren: 2, extraAdultCharge: 25, extraChildCharge: 0, childrenAgeLimit: 12 },
  { id: 3, name: "Executive Suite", baseRate: 250, maxAdults: 3, maxChildren: 2, extraAdultCharge: 30, extraChildCharge: 15, childrenAgeLimit: 12 },
  { id: 4, name: "Presidential Suite", baseRate: 500, maxAdults: 4, maxChildren: 3, extraAdultCharge: 50, extraChildCharge: 25, childrenAgeLimit: 12 },
];

// Mock data for seasonal adjustments
const seasonalAdjustments = [
  { id: 1, name: "Summer Season", adjustment: 15, startDate: "2025-06-01", endDate: "2025-08-31" },
  { id: 2, name: "Winter Holiday", adjustment: 25, startDate: "2025-12-20", endDate: "2026-01-05" },
  { id: 3, name: "Spring Break", adjustment: 10, startDate: "2025-03-01", endDate: "2025-04-15" },
];

// Mock data for promotions and discounts
const promotions = [
  { id: 1, name: "Early Bird Discount", type: "percentage" as const, value: 15, conditions: "Book 30 days in advance" },
  { id: 2, name: "Last Minute Deal", type: "percentage" as const, value: 20, conditions: "Book within 48 hours of stay" },
  { id: 3, name: "Corporate Rate", type: "fixed" as const, value: 85, conditions: "Valid corporate ID required" },
  { id: 4, name: "Romance Package", type: "package" as const, value: 50, conditions: "Includes dinner and champagne" }
];

const RoomRates = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("baseRates");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  
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
          <h1 className="text-3xl font-bold text-navy-500">{t("roomRates")}</h1>
          <p className="text-muted-foreground mt-1">{t("roomRatesDescription")}</p>
        </div>
      </div>
      
      <Tabs defaultValue="baseRates" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2">
          <TabsTrigger value="baseRates" className="flex gap-2 items-center">
            <DollarSign className="h-4 w-4" /> {t("baseRates")}
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" /> {t("seasonal")}
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex gap-2 items-center">
            <Percent className="h-4 w-4" /> {t("promotions")}
          </TabsTrigger>
          <TabsTrigger value="rateCalendar" className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" /> {t("rateCalendar")}
          </TabsTrigger>
          <TabsTrigger value="occupancyRules" className="flex gap-2 items-center">
            <User className="h-4 w-4" /> {t("occupancyRules")}
          </TabsTrigger>
          <TabsTrigger value="channel" className="flex gap-2 items-center">
            <Building2 className="h-4 w-4" /> {t("channels")}
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex gap-2 items-center">
            <LineChart className="h-4 w-4" /> {t("reporting")}
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex gap-2 items-center">
            <Users className="h-4 w-4" /> {t("segments")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="baseRates" className="space-y-4">
          <BaseRates roomTypes={roomTypes} />
        </TabsContent>
        
        <TabsContent value="seasonal" className="space-y-4">
          <SeasonalRates seasonalAdjustments={seasonalAdjustments} />
        </TabsContent>
        
        <TabsContent value="promotions" className="space-y-4">
          <Promotions promotions={promotions} />
        </TabsContent>
        
        <TabsContent value="rateCalendar">
          <Card>
            <CardHeader>
              <CardTitle>{t("rateCalendar")}</CardTitle>
              <CardDescription>{t("rateCalendarDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <RateCalendarSettings 
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                roomTypes={roomTypes}
              />
              
              <RateCalendar selectedMonth={parseInt(selectedMonth)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="occupancyRules" className="space-y-4">
          <OccupancyRules roomTypes={roomTypes} />
        </TabsContent>
        
        <TabsContent value="channel">
          <ComingSoonCard title="channels" description="channelsDescription" />
        </TabsContent>
        
        <TabsContent value="reporting">
          <ComingSoonCard title="reporting" description="reportingDescription" />
        </TabsContent>
        
        <TabsContent value="segments">
          <ComingSoonCard title="segments" description="segmentsDescription" />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default RoomRates;
