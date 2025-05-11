
import { Report, ReportFilter, ReportGenerate } from "@/types/report";

// Mock data for reports
const mockReports: Report[] = [
  {
    id: 1,
    title: "Monthly Occupancy Report",
    type: "occupancy",
    format: "PDF",
    startDate: "2025-04-01T00:00:00.000Z",
    endDate: "2025-04-30T00:00:00.000Z",
    generatedAt: "2025-05-01T09:30:00.000Z",
    status: "Completed",
    fileUrl: "/reports/occupancy-apr-2025.pdf"
  },
  {
    id: 2,
    title: "Q1 Revenue Analysis",
    type: "revenue",
    format: "Excel",
    startDate: "2025-01-01T00:00:00.000Z",
    endDate: "2025-03-31T00:00:00.000Z",
    generatedAt: "2025-04-05T14:20:00.000Z",
    status: "Completed",
    fileUrl: "/reports/revenue-q1-2025.xlsx"
  },
  {
    id: 3,
    title: "Maintenance Issues Summary",
    type: "maintenance",
    format: "PDF",
    startDate: "2025-04-01T00:00:00.000Z",
    endDate: "2025-05-01T00:00:00.000Z",
    generatedAt: "2025-05-02T11:45:00.000Z",
    status: "Completed",
    fileUrl: "/reports/maintenance-apr-2025.pdf"
  }
];

// This is a mock implementation since we don't have a reports table in Supabase yet
export const reportService = {
  getReports: async (filter?: ReportFilter): Promise<Report[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let reports = [...mockReports];
    
    if (filter) {
      if (filter.type) {
        reports = reports.filter(r => r.type === filter.type);
      }
      if (filter.status) {
        reports = reports.filter(r => r.status === filter.status);
      }
      if (filter.startDate) {
        reports = reports.filter(r => new Date(r.startDate) >= new Date(filter.startDate));
      }
      if (filter.endDate) {
        reports = reports.filter(r => new Date(r.endDate) <= new Date(filter.endDate));
      }
    }
    
    return reports;
  },
  
  generateReport: async (report: ReportGenerate): Promise<Report> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newReport: Report = {
      id: mockReports.length + 1,
      title: report.title,
      type: report.type,
      format: report.format,
      startDate: report.startDate,
      endDate: report.endDate,
      generatedAt: new Date().toISOString(),
      status: "Completed",
      fileUrl: `/reports/${report.type}-${new Date().getTime()}.${report.format.toLowerCase()}`
    };
    
    mockReports.push(newReport);
    
    return newReport;
  },
  
  downloadReport: async (id: number): Promise<Blob> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This is a mock implementation that creates a dummy PDF blob
    const text = `This is a mock report file for report ID: ${id}`;
    const blob = new Blob([text], { type: 'application/pdf' });
    
    return blob;
  },
  
  deleteReport: async (id: number): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockReports.findIndex(r => r.id === id);
    if (index !== -1) {
      mockReports.splice(index, 1);
    }
  }
};
