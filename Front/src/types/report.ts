
export type ReportType = 'occupancy' | 'revenue' | 'maintenance' | 'housekeeping' | 'guest' | 'inventory' | 'custom';
export type ReportFormat = 'PDF' | 'Excel' | 'CSV';
export type ReportStatus = 'Generating' | 'Completed' | 'Failed';

export interface Report {
  id: number;
  title: string;
  type: ReportType;
  format: ReportFormat;
  startDate: string;
  endDate: string;
  generatedAt: string;
  generatedBy?: number;
  status: ReportStatus;
  fileUrl?: string;
  parameters?: Record<string, any>;
}

export interface ReportGenerate {
  title: string;
  type: ReportType;
  format: ReportFormat;
  startDate: string;
  endDate: string;
  parameters?: Record<string, any>;
}

export interface ReportFilter {
  type?: ReportType;
  startDate?: string;
  endDate?: string;
  status?: ReportStatus;
}
