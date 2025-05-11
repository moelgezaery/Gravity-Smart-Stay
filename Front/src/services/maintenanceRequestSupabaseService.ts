
import { supabase } from "@/integrations/supabase/client";
import { 
  MaintenanceRequest, 
  MaintenanceRequestCreate, 
  MaintenanceRequestUpdate, 
  MaintenancePriority, 
  MaintenanceStatus 
} from "@/types/maintenanceRequest";

// Convert from our app types to Supabase database types
const mapToSupabase = (request: MaintenanceRequestCreate) => {
  return {
    room_id: request.roomId,
    title: request.title,
    description: request.description,
    priority: request.priority,
    assigned_to_id: request.assignedToId || null,
    estimated_cost: request.estimatedCost || null
  };
};

// Convert from Supabase database types to our app types
const mapFromSupabase = (data: any): MaintenanceRequest => {
  return {
    id: data.id,
    roomId: data.room_id,
    room: data.room || null,
    title: data.title,
    description: data.description,
    priority: data.priority as MaintenancePriority,
    status: data.status as MaintenanceStatus,
    assignedToId: data.assigned_to_id || undefined,
    assignedTo: data.assigned_to || undefined,
    createdAt: data.created_at,
    lastUpdated: data.last_updated || undefined,
    completedAt: data.completed_at || undefined,
    resolutionNotes: data.resolution_notes || undefined,
    estimatedCost: data.estimated_cost || undefined,
    actualCost: data.actual_cost || undefined,
  };
};

export const maintenanceRequestSupabaseService = {
  async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, room:rooms(*)');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getMaintenanceRequest(id: number): Promise<MaintenanceRequest> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, room:rooms(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async createMaintenanceRequest(request: MaintenanceRequestCreate): Promise<MaintenanceRequest> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .insert(mapToSupabase(request))
      .select('*, room:rooms(*)')
      .single();
    
    if (error) throw error;
    
    return mapFromSupabase(data);
  },

  async updateMaintenanceRequest(id: number, request: MaintenanceRequestUpdate): Promise<void> {
    const updates: any = {};
    
    if (request.title) updates.title = request.title;
    if (request.description) updates.description = request.description;
    if (request.priority) updates.priority = request.priority;
    if (request.assignedToId !== undefined) updates.assigned_to_id = request.assignedToId;
    if (request.status) updates.status = request.status;
    if (request.resolutionNotes !== undefined) updates.resolution_notes = request.resolutionNotes;
    if (request.actualCost !== undefined) updates.actual_cost = request.actualCost;
    if (request.estimatedCost !== undefined) updates.estimated_cost = request.estimatedCost;
    if (request.status === 'Completed' && !updates.completed_at) updates.completed_at = new Date().toISOString();
    
    const { error } = await supabase
      .from('maintenance_requests')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteMaintenanceRequest(id: number): Promise<void> {
    const { error } = await supabase
      .from('maintenance_requests')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getMaintenanceRequestsByRoom(roomId: number): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, room:rooms(*)')
      .eq('room_id', roomId);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getMaintenanceRequestsByStatus(status: MaintenanceStatus): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, room:rooms(*)')
      .eq('status', status);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getMaintenanceRequestsByPriority(priority: MaintenancePriority): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, room:rooms(*)')
      .eq('priority', priority);
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  },

  async getPendingMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, room:rooms(*)')
      .eq('status', 'Pending');
    
    if (error) throw error;
    
    return data.map(mapFromSupabase);
  }
};
