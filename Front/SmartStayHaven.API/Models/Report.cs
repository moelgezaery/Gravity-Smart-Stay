using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty; // Occupancy, Revenue, Housekeeping, Maintenance, etc.

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string Format { get; set; } = "PDF"; // PDF, Excel, CSV

        public string? Parameters { get; set; } // JSON string for report-specific parameters

        public string? GeneratedBy { get; set; }

        public string? FilePath { get; set; }

        public string? Status { get; set; } = "Pending"; // Pending, Generating, Completed, Failed

        public string? ErrorMessage { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        public DateTime? GeneratedAt { get; set; }
    }
} 