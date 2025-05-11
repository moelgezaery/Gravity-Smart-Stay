import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Download as DownloadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Report, ReportType, ReportFormat, ReportFilter } from '../types/report';
import { reportService } from '../services/reportService';

export const Reports: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [filter, setFilter] = useState<ReportFilter>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [newReport, setNewReport] = useState({
        title: '',
        type: '' as ReportType,
        format: 'PDF' as ReportFormat,
        startDate: new Date(),
        endDate: new Date()
    });

    const loadReports = useCallback(async () => {
        try {
            const data = await reportService.getReports(filter);
            setReports(data);
        } catch (error) {
            console.error('Error loading reports:', error);
        }
    }, [filter]);

    useEffect(() => {
        loadReports();
    }, [filter, loadReports]);

    const handleFilterChange = (field: keyof ReportFilter, value: string | undefined) => {
        setFilter(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateReport = async () => {
        try {
            setIsGenerating(true);
            await reportService.generateReport({
                ...newReport,
                startDate: newReport.startDate.toISOString(),
                endDate: newReport.endDate.toISOString()
            });
            setOpenDialog(false);
            loadReports();
        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = async (id: number) => {
        try {
            const blob = await reportService.downloadReport(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            try {
                await reportService.deleteReport(id);
                loadReports();
            } catch (error) {
                console.error('Error deleting report:', error);
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Reports
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenDialog(true)}
                    >
                        Generate New Report
                    </Button>
                </Box>

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid sx={{ xs: 12, sm: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Report Type</InputLabel>
                                    <Select
                                        value={filter.type || ''}
                                        label="Report Type"
                                        onChange={(e: SelectChangeEvent) => handleFilterChange('type', e.target.value)}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="occupancy">Occupancy</MenuItem>
                                        <MenuItem value="revenue">Revenue</MenuItem>
                                        <MenuItem value="maintenance">Maintenance</MenuItem>
                                        <MenuItem value="housekeeping">Housekeeping</MenuItem>
                                        <MenuItem value="guest">Guest</MenuItem>
                                        <MenuItem value="inventory">Inventory</MenuItem>
                                        <MenuItem value="custom">Custom</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid sx={{ xs: 12, sm: 3 }}>
                                <DatePicker
                                    label="Start Date"
                                    value={filter.startDate ? new Date(filter.startDate) : null}
                                    onChange={(date) => handleFilterChange('startDate', date?.toISOString())}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </Grid>
                            <Grid sx={{ xs: 12, sm: 3 }}>
                                <DatePicker
                                    label="End Date"
                                    value={filter.endDate ? new Date(filter.endDate) : null}
                                    onChange={(date) => handleFilterChange('endDate', date?.toISOString())}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </Grid>
                            <Grid sx={{ xs: 12, sm: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={filter.status || ''}
                                        label="Status"
                                        onChange={(e: SelectChangeEvent) => handleFilterChange('status', e.target.value)}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="Generating">Generating</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                        <MenuItem value="Failed">Failed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Grid container spacing={2}>
                    {reports.map((report) => (
                        <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={report.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {report.title}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Type: {report.type}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Status: {report.status}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Generated: {new Date(report.generatedAt).toLocaleString()}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <IconButton
                                            onClick={() => handleDownload(report.id)}
                                            disabled={report.status !== 'Completed'}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(report.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Generate New Report</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                            <TextField
                                label="Report Title"
                                value={newReport.title}
                                onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Report Type</InputLabel>
                                <Select
                                    value={newReport.type}
                                    label="Report Type"
                                    onChange={(e: SelectChangeEvent) => setNewReport(prev => ({ ...prev, type: e.target.value as ReportType }))}
                                >
                                    <MenuItem value="occupancy">Occupancy</MenuItem>
                                    <MenuItem value="revenue">Revenue</MenuItem>
                                    <MenuItem value="maintenance">Maintenance</MenuItem>
                                    <MenuItem value="housekeeping">Housekeeping</MenuItem>
                                    <MenuItem value="guest">Guest</MenuItem>
                                    <MenuItem value="inventory">Inventory</MenuItem>
                                    <MenuItem value="custom">Custom</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Format</InputLabel>
                                <Select
                                    value={newReport.format}
                                    label="Format"
                                    onChange={(e: SelectChangeEvent) => setNewReport(prev => ({ ...prev, format: e.target.value as ReportFormat }))}
                                >
                                    <MenuItem value="PDF">PDF</MenuItem>
                                    <MenuItem value="Excel">Excel</MenuItem>
                                    <MenuItem value="CSV">CSV</MenuItem>
                                </Select>
                            </FormControl>
                            <DatePicker
                                label="Start Date"
                                value={newReport.startDate}
                                onChange={(date) => date && setNewReport(prev => ({ ...prev, startDate: date }))}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                            <DatePicker
                                label="End Date"
                                value={newReport.endDate}
                                onChange={(date) => date && setNewReport(prev => ({ ...prev, endDate: date }))}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button
                            onClick={handleGenerateReport}
                            variant="contained"
                            disabled={isGenerating || !newReport.title || !newReport.type}
                        >
                            Generate
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </LocalizationProvider>
    );
}; 