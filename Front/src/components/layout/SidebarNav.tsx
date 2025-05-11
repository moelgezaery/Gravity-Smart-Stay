
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@/context/NavigationContext";
import { NavigationItem } from "@/config/navigationConfig";

export function SidebarNav() {
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { allowedNavigation } = useNavigation();
  
  const handleUnimplementedFeature = (feature: string) => {
    toast({
      title: t("comingSoon"),
      description: t("featureAvailable", { feature })
    });
  };

  // Recursive function to render navigation items and their children
  const renderNavItems = (items: NavigationItem[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.key}>
        {item.path ? (
          <SidebarMenuButton 
            asChild 
            isActive={location.pathname === item.path || 
                     (item.path !== "/" && location.pathname.startsWith(item.path))}
          >
            <Link to={item.path}>
              <item.icon className="h-4 w-4" />
              <span>{t(item.label)}</span>
            </Link>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton 
            onClick={() => item.children?.length === 0 && handleUnimplementedFeature(t(item.label))}
          >
            <item.icon className="h-4 w-4" />
            <span>{t(item.label)}</span>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    ));
  };
  
  return (
    <>
      <div className="py-4 px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/d8664fc3-262a-4828-a474-946392a103c5.png" 
            alt="Gravity Smart Stay Logo" 
            className="h-8 w-8"
          />
          <div>
            <h2 className="text-lg font-semibold">{t("appName")}</h2>
          </div>
        </div>
      </div>
      
      <SidebarContent>
        {allowedNavigation.map((category) => (
          <SidebarGroup key={category.key}>
            {category.key !== "home" && (
              <SidebarGroupLabel>{t(category.label)}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {category.key === "home" ? (
                  renderNavItems([category])
                ) : category.children ? (
                  renderNavItems(category.children)
                ) : (
                  renderNavItems([category])
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter>
        <Link to="/login" className="w-full">
          <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">JS</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-xs text-muted-foreground">{t("logout")}</p>
            </div>
          </div>
        </Link>
      </SidebarFooter>
    </>
  );
}
