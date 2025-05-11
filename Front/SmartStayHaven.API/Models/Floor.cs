using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SmartStayHaven.API.Models
{
    public class Floor
    {
        public int Id { get; set; }

        [Required]
        public int Number { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public int TotalRooms { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Room> Rooms { get; set; }
    }
} 