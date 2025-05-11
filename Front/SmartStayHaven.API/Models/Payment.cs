using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BookingId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty; // Cash, CreditCard, DebitCard, BankTransfer

        [Required]
        public string Status { get; set; } = "Pending"; // Pending, Completed, Failed, Refunded

        public string? TransactionId { get; set; }

        public string? CardLastFour { get; set; }

        public string? CardType { get; set; }

        public string? Notes { get; set; }

        public string? Reference { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        public DateTime? ProcessedAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        // Navigation properties
        public Booking? Booking { get; set; }
    }
} 