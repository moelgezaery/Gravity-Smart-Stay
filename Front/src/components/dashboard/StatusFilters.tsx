
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "./StatusBadge";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StatusFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function StatusFilters({
  onFilterChange
}: StatusFiltersProps) {
  const { t } = useTranslation();
  
  return <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">{t("roomStatus")}</h1>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-2">
            <StatusBadge status="vacant" /> 
            <span className="ml-1">12</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <StatusBadge status="occupied" /> 
            <span className="ml-1">8</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <StatusBadge status="reserved" /> 
            <span className="ml-1">3</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <StatusBadge status="maintenance" /> 
            <span className="ml-1">1</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <StatusBadge status="cleaning" /> 
            <span className="ml-1">2</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <StatusBadge status="checkout" /> 
            <span className="ml-1">2</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("search")} className="pl-8" />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filterByStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStatuses")}</SelectItem>
              <SelectItem value="vacant">{t("vacant")}</SelectItem>
              <SelectItem value="occupied">{t("occupied")}</SelectItem>
              <SelectItem value="reserved">{t("reserved")}</SelectItem>
              <SelectItem value="maintenance">{t("maintenanceStatus")}</SelectItem>
              <SelectItem value="cleaning">{t("cleaning")}</SelectItem>
              <SelectItem value="checkout">{t("checkout")}</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all-types">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filterByType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">{t("allTypes")}</SelectItem>
              <SelectItem value="standard">{t("standard")}</SelectItem>
              <SelectItem value="deluxe">{t("deluxe")}</SelectItem>
              <SelectItem value="suite">{t("suite")}</SelectItem>
              <SelectItem value="executive">{t("executive")}</SelectItem>
              <SelectItem value="presidential">{t("presidential")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>;
}
