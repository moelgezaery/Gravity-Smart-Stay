using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int GuestId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        [Required]
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, CheckedIn, CheckedOut, Cancelled

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        public string? SpecialRequests { get; set; }

        public int? NumberOfGuests { get; set; }

        public string? PaymentStatus { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        // Navigation properties
        public Guest? Guest { get; set; }
        public Room? Room { get; set; }
        public ICollection<Charge>? Charges { get; set; }
        public ICollection<Payment>? Payments { get; set; }
    }
} 