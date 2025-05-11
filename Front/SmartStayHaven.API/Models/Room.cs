using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(10)]
        public string RoomNumber { get; set; } = string.Empty;

        [Required]
        public int RoomTypeId { get; set; }

        [ForeignKey("RoomTypeId")]
        public RoomType? RoomType { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Available"; // Available, Occupied, Maintenance, Cleaning

        [Column(TypeName = "decimal(18,2)")]
        public decimal BasePrice { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<Maintenance> Maintenance { get; set; } = new List<Maintenance>();
        public ICollection<Housekeeping> Housekeeping { get; set; } = new List<Housekeeping>();
    }
} 