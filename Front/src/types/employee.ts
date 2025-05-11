
export type EmployeeRole = 'Manager' | 'Receptionist' | 'Housekeeper' | 'Maintenance' | 'Admin' | 'Other';
export type EmployeeStatus = 'Active' | 'OnLeave' | 'Terminated';

export interface Employee {
  id: number;
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: EmployeeRole;
  department?: string;
  hireDate: string;
  status: EmployeeStatus;
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface EmployeeCreate {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: EmployeeRole;
  department?: string;
  hireDate: string;
  status?: EmployeeStatus;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface EmployeeUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: EmployeeRole;
  department?: string;
  status?: EmployeeStatus;
  emergencyContact?: string;
  emergencyPhone?: string;
}
