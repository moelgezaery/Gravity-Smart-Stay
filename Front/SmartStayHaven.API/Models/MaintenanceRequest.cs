using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class MaintenanceRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }
        public Room Room { get; set; } = null!;

        [Required]
        public required string Title { get; set; }

        [Required]
        public required string Description { get; set; }

        [Required]
        public required string Priority { get; set; } // Low, Medium, High, Emergency

        [Required]
        public required string Status { get; set; } // Pending, InProgress, Completed, Cancelled

        public int? AssignedToId { get; set; }
        public User? AssignedTo { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        public DateTime? CompletedAt { get; set; }

        public string? ResolutionNotes { get; set; }

        public decimal? EstimatedCost { get; set; }

        public decimal? ActualCost { get; set; }
    }
} 