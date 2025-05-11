using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class Housekeeping
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public string Status { get; set; } = "Pending"; // Pending, InProgress, Completed, Skipped

        [Required]
        public DateTime ScheduledDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public string? Notes { get; set; }

        public string? CleaningType { get; set; } // Regular, Deep, Turnover

        public bool IsUrgent { get; set; }

        public string? Priority { get; set; } // Low, Medium, High

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        // Navigation properties
        public Room? Room { get; set; }
        public Employee? Employee { get; set; }
    }
} 