using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartStayHaven.API.Models
{
    public class RoomAmenity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        [StringLength(50)]
        public string Icon { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<RoomType> RoomTypes { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public string Category { get; set; }

        public bool IsAvailable { get; set; } = true;

        [ForeignKey("RoomId")]
        public Room? Room { get; set; }
    }
} 