
import { Employee, EmployeeCreate, EmployeeUpdate, EmployeeRole, EmployeeStatus } from '@/types/employee';

// Mock data for development
const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@smartstayhaven.com',
    phone: '555-123-4567',
    role: 'Manager',
    department: 'Operations',
    hireDate: '2023-01-15T00:00:00.000Z',
    status: 'Active',
    createdAt: '2023-01-15T00:00:00.000Z',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@smartstayhaven.com',
    phone: '555-987-6543',
    role: 'Receptionist',
    department: 'Front Desk',
    hireDate: '2023-03-01T00:00:00.000Z',
    status: 'Active',
    createdAt: '2023-03-01T00:00:00.000Z',
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@smartstayhaven.com',
    phone: '555-456-7890',
    role: 'Housekeeper',
    department: 'Housekeeping',
    hireDate: '2023-02-15T00:00:00.000Z',
    status: 'Active',
    createdAt: '2023-02-15T00:00:00.000Z',
  }
];

// This is a mock service that can be replaced with a Supabase service when needed
export const employeeService = {
  getEmployees: async (): Promise<Employee[]> => {
    return Promise.resolve([...mockEmployees]);
  },

  getEmployee: async (id: number): Promise<Employee | null> => {
    const employee = mockEmployees.find(e => e.id === id);
    return Promise.resolve(employee || null);
  },

  createEmployee: async (employee: EmployeeCreate): Promise<Employee> => {
    const newEmployee: Employee = {
      id: mockEmployees.length + 1,
      ...employee,
      status: employee.status || 'Active',
      createdAt: new Date().toISOString()
    };
    
    mockEmployees.push(newEmployee);
    return Promise.resolve({...newEmployee});
  },

  updateEmployee: async (id: number, employee: EmployeeUpdate): Promise<void> => {
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEmployees[index] = {
        ...mockEmployees[index],
        ...employee,
        updatedAt: new Date().toISOString()
      };
    }
    
    return Promise.resolve();
  },

  deleteEmployee: async (id: number): Promise<void> => {
    const index = mockEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEmployees.splice(index, 1);
    }
    
    return Promise.resolve();
  },

  getEmployeesByRole: async (role: EmployeeRole): Promise<Employee[]> => {
    const employees = mockEmployees.filter(e => e.role === role);
    return Promise.resolve([...employees]);
  },

  getEmployeesByStatus: async (status: EmployeeStatus): Promise<Employee[]> => {
    const employees = mockEmployees.filter(e => e.status === status);
    return Promise.resolve([...employees]);
  },

  getEmployeesByDepartment: async (department: string): Promise<Employee[]> => {
    const employees = mockEmployees.filter(e => e.department === department);
    return Promise.resolve([...employees]);
  },

  getActiveEmployees: async (): Promise<Employee[]> => {
    const employees = mockEmployees.filter(e => e.status === 'Active');
    return Promise.resolve([...employees]);
  }
};
