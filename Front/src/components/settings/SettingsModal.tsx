
import React from "react";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Monitor, Globe, Languages } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: "en" | "ar") => {
    console.log("Setting language to:", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("settings")}</DialogTitle>
          <DialogDescription>
            {t("settingsMenu")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t("theme")}</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={theme === "light" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleThemeChange("light")}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                {t("lightMode")}
              </Button>
              <Button 
                variant={theme === "dark" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleThemeChange("dark")}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                {t("darkMode")}
              </Button>
              <Button 
                variant={theme === "system" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleThemeChange("system")}
                className="gap-2"
              >
                <Monitor className="h-4 w-4" />
                {t("systemTheme")}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{t("language")}</h4>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={language === "en" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleLanguageChange("en")}
                className="gap-2"
              >
                <Globe className="h-4 w-4" />
                {t("english")}
              </Button>
              <Button 
                variant={language === "ar" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleLanguageChange("ar")}
                className="gap-2"
              >
                <Languages className="h-4 w-4" />
                {t("arabic")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
