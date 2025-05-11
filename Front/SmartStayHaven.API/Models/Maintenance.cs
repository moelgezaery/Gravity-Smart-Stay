using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class Maintenance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "Pending"; // Pending, InProgress, Completed, Cancelled

        [Required]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High, Emergency

        [Required]
        public string Category { get; set; } = string.Empty; // Plumbing, Electrical, HVAC, General, etc.

        public DateTime? ScheduledDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        public string? Resolution { get; set; }

        public decimal? Cost { get; set; }

        public bool IsUrgent { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        // Navigation properties
        public Room? Room { get; set; }
        public Employee? Employee { get; set; }
    }
} 