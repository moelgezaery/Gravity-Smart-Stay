
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavigationItem, NavigationPermission, navigationConfig } from '@/config/navigationConfig';

interface NavigationContextType {
  allowedNavigation: NavigationItem[];
  userPermissions: NavigationPermission[];
  setUserPermissions: (permissions: NavigationPermission[]) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  // In a real application, these permissions would come from your authentication system
  // For now, we'll just use a state that can be updated for testing
  const [userPermissions, setUserPermissions] = useState<NavigationPermission[]>([
    "front_Office", 
    "room_status", 
    "guest_Concierge", 
    "financial", 
    "analytics", 
    "system_config"
  ]);
  
  const [allowedNavigation, setAllowedNavigation] = useState<NavigationItem[]>([]);
  
  // Filter the navigation config based on user permissions
  useEffect(() => {
    const filterNavigation = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .filter(item => userPermissions.includes(item.permission))
        .map(item => {
          if (item.children) {
            return {
              ...item,
              children: item.children.filter(child => 
                userPermissions.includes(child.permission)
              )
            };
          }
          return item;
        });
    };
    
    const filteredNavigation = filterNavigation(navigationConfig);
    setAllowedNavigation(filteredNavigation);
  }, [userPermissions]);

  return (
    <NavigationContext.Provider value={{ 
      allowedNavigation, 
      userPermissions, 
      setUserPermissions 
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  
  return context;
}
