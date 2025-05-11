
import { housekeepingSupabaseService } from "./housekeepingSupabaseService";
import { HousekeepingTask, HousekeepingTaskCreate, HousekeepingTaskUpdate, HousekeepingStatus, CleaningType } from "@/types/housekeeping";

export const housekeepingService = {
  getTasks: async (): Promise<HousekeepingTask[]> => {
    return housekeepingSupabaseService.getTasks();
  },

  getTask: async (id: number): Promise<HousekeepingTask> => {
    return housekeepingSupabaseService.getTask(id);
  },

  createTask: async (task: HousekeepingTaskCreate): Promise<HousekeepingTask> => {
    return housekeepingSupabaseService.createTask(task);
  },

  updateTask: async (id: number, task: HousekeepingTaskUpdate): Promise<void> => {
    return housekeepingSupabaseService.updateTask(id, task);
  },

  deleteTask: async (id: number): Promise<void> => {
    return housekeepingSupabaseService.deleteTask(id);
  },

  getTasksByRoom: async (roomId: number): Promise<HousekeepingTask[]> => {
    return housekeepingSupabaseService.getTasksByRoom(roomId);
  },

  getTasksByStatus: async (status: HousekeepingStatus): Promise<HousekeepingTask[]> => {
    return housekeepingSupabaseService.getTasksByStatus(status);
  },

  getTasksByEmployee: async (employeeId: number): Promise<HousekeepingTask[]> => {
    return housekeepingSupabaseService.getTasksByEmployee(employeeId);
  },

  getTasksForToday: async (): Promise<HousekeepingTask[]> => {
    return housekeepingSupabaseService.getTasksForToday();
  },

  completeTask: async (id: number, notes?: string): Promise<void> => {
    const update: HousekeepingTaskUpdate = {
      status: 'Completed',
      completedAt: new Date().toISOString(),
      notes: notes
    };
    return housekeepingSupabaseService.updateTask(id, update);
  },

  verifyTask: async (id: number, verifiedById: number, notes?: string): Promise<void> => {
    const update: HousekeepingTaskUpdate = {
      status: 'Verified',
      verifiedById,
      verificationNotes: notes
    };
    return housekeepingSupabaseService.updateTask(id, update);
  }
};
