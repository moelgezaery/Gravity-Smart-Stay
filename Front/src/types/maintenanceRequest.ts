
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Emergency';
export type MaintenanceStatus = 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';

export interface MaintenanceRequest {
  id: number;
  roomId: number;
  room?: any;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  assignedToId?: number;
  assignedTo?: any;
  createdAt: string;
  lastUpdated?: string;
  completedAt?: string;
  resolutionNotes?: string;
  estimatedCost?: number;
  actualCost?: number;
}

export interface MaintenanceRequestCreate {
  roomId: number;
  title: string;
  description: string;
  priority: MaintenancePriority;
  assignedToId?: number;
  estimatedCost?: number;
}

export interface MaintenanceRequestUpdate {
  title?: string;
  description?: string;
  priority?: MaintenancePriority;
  status?: MaintenanceStatus;
  assignedToId?: number;
  resolutionNotes?: string;
  estimatedCost?: number;
  actualCost?: number;
}
