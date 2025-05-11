
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/context/NavigationContext";
import { NavigationPermission } from "@/config/navigationConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const PermissionDemo = () => {
  const { userPermissions, setUserPermissions } = useNavigation();
  const [selectedPermissions, setSelectedPermissions] = useState<NavigationPermission[]>(
    [...userPermissions]
  );
  
  const allPermissions: { label: string; value: NavigationPermission }[] = [
    { label: "Reservation Snapshot", value: "reservation_snapshot" },
    { label: "Room Status & Housekeeping", value: "room_status" },
    { label: "Front Desk Workflow", value: "front_desk" },
    { label: "Financial Overview", value: "financial" },
    { label: "Analytics & Reports", value: "analytics" },
    { label: "System Configuration", value: "system_config" }
  ];

  const handlePermissionChange = (permission: NavigationPermission) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const applyPermissions = () => {
    setUserPermissions(selectedPermissions);
    toast({
      title: "Permissions updated",
      description: "The navigation sidebar has been updated based on your permissions."
    });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Permission Demo</h1>
      <Card>
        <CardHeader>
          <CardTitle>Test Navigation Permissions</CardTitle>
          <CardDescription>
            Select permissions to see how the navigation sidebar changes based on user access rights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allPermissions.map((permission) => (
                <div key={permission.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={permission.value}
                    checked={selectedPermissions.includes(permission.value)}
                    onCheckedChange={() => handlePermissionChange(permission.value)}
                  />
                  <label 
                    htmlFor={permission.value}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {permission.label}
                  </label>
                </div>
              ))}
            </div>
            
            <Button onClick={applyPermissions}>Apply Permissions</Button>
            
            <div className="mt-6 p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Current User Permissions:</h3>
              <div className="flex flex-wrap gap-2">
                {userPermissions.map((permission) => (
                  <span 
                    key={permission}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default PermissionDemo;
