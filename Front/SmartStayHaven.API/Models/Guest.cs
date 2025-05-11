using System.ComponentModel.DataAnnotations;

namespace SmartStayHaven.API.Models
{
    public class Guest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }

        public string? PassportNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? SpecialRequests { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }

        // Navigation properties
        public ICollection<Booking>? Bookings { get; set; }
    }
} 