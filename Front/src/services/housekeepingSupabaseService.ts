import { supabase } from "@/integrations/supabase/client";

// Define types for housekeeping service
export type HousekeepingStatus = 'Pending' | 'InProgress' | 'Completed' | 'Verified';
export type CleaningType = 'Standard' | 'Deep' | 'Turndown' | 'Checkout';

export interface HousekeepingTask {
  id: number;
  roomId: number;
  room?: any;
  assignedToId?: number;
  assignedTo?: any;
  status: HousekeepingStatus;
  cleaningType: CleaningType;
  notes?: string;
  scheduledDate: string;
  completedAt?: string;
  createdAt: string;
  verifiedById?: number;
  verifiedBy?: any;
  verificationNotes?: string;
}

export interface HousekeepingTaskCreate {
  roomId: number;
  assignedToId?: number;
  status?: HousekeepingStatus;
  cleaningType: CleaningType;
  notes?: string;
  scheduledDate: string;
}

export interface HousekeepingTaskUpdate {
  assignedToId?: number;
  status?: HousekeepingStatus;
  notes?: string;
  completedAt?: string;
  verifiedById?: number;
  verificationNotes?: string;
}

const mapToSupabase = (task: HousekeepingTaskCreate | HousekeepingTaskUpdate) => {
  const mappedData: any = {};
  
  if ('roomId' in task) mappedData.room_id = task.roomId;
  if ('assignedToId' in task) mappedData.assigned_to_id = task.assignedToId;
  if ('status' in task) mappedData.status = task.status;
  if ('cleaningType' in task) mappedData.cleaning_type = task.cleaningType;
  if ('notes' in task) mappedData.notes = task.notes;
  if ('scheduledDate' in task) mappedData.scheduled_date = task.scheduledDate;
  if ('completedAt' in task) mappedData.completed_at = task.completedAt;
  if ('verifiedById' in task) mappedData.verified_by_id = task.verifiedById;
  if ('verificationNotes' in task) mappedData.verification_notes = task.verificationNotes;
  
  return mappedData;
};

const mapFromSupabase = (data: any): HousekeepingTask => {
  return {
    id: data.id,
    roomId: data.room_id,
    room: data.room,
    assignedToId: data.assigned_to_id,
    assignedTo: data.assigned_to,
    status: data.status as HousekeepingStatus,
    cleaningType: data.cleaning_type as CleaningType,
    notes: data.notes,
    scheduledDate: data.scheduled_date,
    completedAt: data.completed_at,
    createdAt: data.created_at,
    verifiedById: data.verified_by_id,
    verifiedBy: data.verified_by,
    verificationNotes: data.verification_notes
  };
};

// Since we don't have a housekeeping_tasks table yet in Supabase
// we'll create mock data and functions to simulate its behavior
const mockHousekeepingTasks: HousekeepingTask[] = [
  {
    id: 1,
    roomId: 101,
    status: 'Pending',
    cleaningType: 'Standard',
    scheduledDate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    roomId: 102,
    status: 'Completed',
    cleaningType: 'Checkout',
    scheduledDate: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
] as HousekeepingTask[];

// Changed to use a mock implementation until we set up the housekeeping_tasks table in Supabase
export const housekeepingSupabaseService = {
  async getTasks(): Promise<HousekeepingTask[]> {
    // Mock implementation
    return Promise.resolve([...mockHousekeepingTasks]);
  },

  async getTask(id: number): Promise<HousekeepingTask> {
    // Mock implementation
    const task = mockHousekeepingTasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return Promise.resolve({...task});
  },

  async createTask(task: HousekeepingTaskCreate): Promise<HousekeepingTask> {
    // Mock implementation
    const newTask: HousekeepingTask = {
      id: mockHousekeepingTasks.length + 1,
      roomId: task.roomId,
      assignedToId: task.assignedToId,
      status: task.status || 'Pending',
      cleaningType: task.cleaningType,
      notes: task.notes,
      scheduledDate: task.scheduledDate,
      createdAt: new Date().toISOString()
    };
    
    mockHousekeepingTasks.push(newTask);
    return Promise.resolve({...newTask});
  },

  async updateTask(id: number, task: HousekeepingTaskUpdate): Promise<void> {
    // Mock implementation
    const index = mockHousekeepingTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    mockHousekeepingTasks[index] = {
      ...mockHousekeepingTasks[index],
      ...task
    };
    
    return Promise.resolve();
  },

  async deleteTask(id: number): Promise<void> {
    // Mock implementation
    const index = mockHousekeepingTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      mockHousekeepingTasks.splice(index, 1);
    }
    
    return Promise.resolve();
  },

  async getTasksByRoom(roomId: number): Promise<HousekeepingTask[]> {
    // Mock implementation
    const tasks = mockHousekeepingTasks.filter(t => t.roomId === roomId);
    return Promise.resolve([...tasks]);
  },

  async getTasksByStatus(status: HousekeepingStatus): Promise<HousekeepingTask[]> {
    // Mock implementation
    const tasks = mockHousekeepingTasks.filter(t => t.status === status);
    return Promise.resolve([...tasks]);
  },

  async getTasksByEmployee(employeeId: number): Promise<HousekeepingTask[]> {
    // Mock implementation
    const tasks = mockHousekeepingTasks.filter(t => t.assignedToId === employeeId);
    return Promise.resolve([...tasks]);
  },

  async getTasksForToday(): Promise<HousekeepingTask[]> {
    // Mock implementation
    const today = new Date().toISOString().split('T')[0];
    
    const tasks = mockHousekeepingTasks.filter(t => 
      t.scheduledDate.startsWith(today)
    );
    
    return Promise.resolve([...tasks]);
  }
};
