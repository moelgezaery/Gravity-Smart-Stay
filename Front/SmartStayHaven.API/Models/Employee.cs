using System.ComponentModel.DataAnnotations;

namespace SmartStayHaven.API.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public string Department { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public string Status { get; set; } = "Active";

        public string? Schedule { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastUpdated { get; set; }
    }
} 