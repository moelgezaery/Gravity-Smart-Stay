using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class RoomServiceOrder
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BookingId { get; set; }

        [Required]
        public required string OrderType { get; set; } // Food, Laundry, Housekeeping, etc.

        [Required]
        public string Status { get; set; } = "Pending";

        [Required]
        public string Description { get; set; }

        public string? SpecialInstructions { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        public int? AssignedToId { get; set; }

        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

        public DateTime? CompletedAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        [ForeignKey("BookingId")]
        public Booking? Booking { get; set; }

        [ForeignKey("AssignedToId")]
        public Employee? AssignedTo { get; set; }
    }
} 