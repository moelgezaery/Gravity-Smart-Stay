
import React, { useState } from "react";
import { BellIcon, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { SettingsModal } from "./settings/SettingsModal";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and name */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="/lovable-uploads/d8664fc3-262a-4828-a474-946392a103c5.png" 
                  alt="Gravity Smart Stay Logo" 
                  className="h-10 w-10"
                />
                <span className="ml-2 text-xl font-semibold text-foreground">
                  {t('appName')}
                </span>
              </div>
            </div>

            {/* Right-side items */}
            <div className="flex items-center space-x-4">
              {/* Settings button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                className="text-foreground"
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* Notification bell */}
              <div className="relative">
                <button className="p-1 rounded-full text-foreground hover:bg-accent focus:outline-none">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                </button>
              </div>

              {/* User menu dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        AM
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer">{t('profile')}</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setSettingsOpen(true)}>
                    {t('settingsMenu')}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">{t('signOut')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export default Navbar;
