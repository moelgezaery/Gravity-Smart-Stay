using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Models;
using SmartStayHaven.API.Data;
using System.Text.Json;

namespace SmartStayHaven.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ReportController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: api/Report
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetReports(
            [FromQuery] string? type,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] string? status)
        {
            var query = _context.Reports.AsQueryable();

            if (!string.IsNullOrEmpty(type))
                query = query.Where(r => r.Type == type);

            if (startDate.HasValue)
                query = query.Where(r => r.StartDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(r => r.EndDate <= endDate.Value);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(r => r.Status == status);

            return await query.ToListAsync();
        }

        // GET: api/Report/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

        // GET: api/Report/5/download
        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            if (report.Status != "Completed")
            {
                return BadRequest("Report is not ready for download");
            }

            if (string.IsNullOrEmpty(report.FilePath))
            {
                return NotFound("Report file path is missing");
            }

            var filePath = Path.Combine(_environment.ContentRootPath, report.FilePath);
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Report file not found");
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var contentType = report.Format.ToLower() switch
            {
                "pdf" => "application/pdf",
                "excel" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "csv" => "text/csv",
                _ => "application/octet-stream"
            };

            return File(fileBytes, contentType, Path.GetFileName(filePath));
        }

        // POST: api/Report
        [HttpPost]
        public async Task<ActionResult<Report>> CreateReport(Report report)
        {
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
        }

        // POST: api/Report/generate
        [HttpPost("generate")]
        public async Task<ActionResult<Report>> GenerateReport([FromBody] ReportGenerationRequest request)
        {
            var report = new Report
            {
                Title = request.Title,
                Type = request.Type,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Format = request.Format,
                Parameters = JsonSerializer.Serialize(request.Parameters),
                Status = "Generating",
                GeneratedBy = User.Identity?.Name
            };

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            // Start report generation in background
            _ = GenerateReportAsync(report.Id);

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, report);
        }

        // DELETE: api/Report/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            // Delete the report file if it exists
            if (!string.IsNullOrEmpty(report.FilePath))
            {
                var filePath = Path.Combine(_environment.ContentRootPath, report.FilePath);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task GenerateReportAsync(int reportId)
        {
            try
            {
                var report = await _context.Reports.FindAsync(reportId);
                if (report == null) return;

                // TODO: Implement actual report generation logic based on report type
                // This would typically involve:
                // 1. Querying relevant data
                // 2. Processing the data
                // 3. Generating the report file
                // 4. Saving the file
                // 5. Updating the report status

                // For now, we'll just simulate a successful report generation
                await Task.Delay(2000); // Simulate processing time

                var reportsDirectory = Path.Combine(_environment.ContentRootPath, "reports", report.Type);
                Directory.CreateDirectory(reportsDirectory);

                report.Status = "Completed";
                report.GeneratedAt = DateTime.UtcNow;
                report.FilePath = Path.Combine("reports", report.Type, $"{report.Id}.{report.Format.ToLower()}");

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var report = await _context.Reports.FindAsync(reportId);
                if (report != null)
                {
                    report.Status = "Failed";
                    report.ErrorMessage = ex.Message;
                    await _context.SaveChangesAsync();
                }
            }
        }
    }

    public class ReportGenerationRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Format { get; set; } = "PDF";
        public Dictionary<string, object>? Parameters { get; set; }
    }
} 