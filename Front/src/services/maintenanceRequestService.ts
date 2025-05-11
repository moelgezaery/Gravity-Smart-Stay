
import { maintenanceRequestSupabaseService } from "./maintenanceRequestSupabaseService";
import { 
  MaintenanceRequest, 
  MaintenanceRequestCreate, 
  MaintenanceRequestUpdate,
  MaintenancePriority,
  MaintenanceStatus
} from "@/types/maintenanceRequest";

export const maintenanceRequestService = {
  getMaintenanceRequests: async (): Promise<MaintenanceRequest[]> => {
    return maintenanceRequestSupabaseService.getMaintenanceRequests();
  },

  getMaintenanceRequest: async (id: number): Promise<MaintenanceRequest> => {
    return maintenanceRequestSupabaseService.getMaintenanceRequest(id);
  },

  createMaintenanceRequest: async (request: MaintenanceRequestCreate): Promise<MaintenanceRequest> => {
    return maintenanceRequestSupabaseService.createMaintenanceRequest(request);
  },

  updateMaintenanceRequest: async (id: number, request: MaintenanceRequestUpdate): Promise<void> => {
    return maintenanceRequestSupabaseService.updateMaintenanceRequest(id, request);
  },

  deleteMaintenanceRequest: async (id: number): Promise<void> => {
    return maintenanceRequestSupabaseService.deleteMaintenanceRequest(id);
  },

  getMaintenanceRequestsByRoom: async (roomId: number): Promise<MaintenanceRequest[]> => {
    return maintenanceRequestSupabaseService.getMaintenanceRequestsByRoom(roomId);
  },

  getMaintenanceRequestsByStatus: async (status: MaintenanceStatus): Promise<MaintenanceRequest[]> => {
    return maintenanceRequestSupabaseService.getMaintenanceRequestsByStatus(status);
  },

  getPendingMaintenanceRequests: async (): Promise<MaintenanceRequest[]> => {
    return maintenanceRequestSupabaseService.getPendingMaintenanceRequests();
  }
};
