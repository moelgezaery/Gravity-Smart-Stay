
import React from 'react';
import { Sun, Moon, Globe, Languages } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "react-i18next";

const ThemeLanguageControl = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="flex items-center gap-2"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="hidden sm:inline">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="flex items-center gap-2"
      >
        {language === "en" ? <Languages className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
        <span className="hidden sm:inline">{language === "en" ? t("arabic") : t("english")}</span>
      </Button>
    </div>
  );
};

export default ThemeLanguageControl;
