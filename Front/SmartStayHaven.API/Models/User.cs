using System.ComponentModel.DataAnnotations;

namespace SmartStayHaven.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        public required string PasswordHash { get; set; }
        
        [Required]
        public required string FirstName { get; set; }
        
        [Required]
        public required string LastName { get; set; }
        
        [Required]
        public required string Role { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? LastLogin { get; set; }
    }
} 