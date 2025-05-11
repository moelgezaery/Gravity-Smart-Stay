using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SmartStayHaven.API.Models
{
    public class RoomType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        public decimal BaseRate { get; set; }

        public int MaxOccupancy { get; set; }

        public int BedCount { get; set; }

        [StringLength(20)]
        public string BedType { get; set; }

        public bool HasBalcony { get; set; }

        public bool HasOceanView { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        [JsonIgnore] // ← Now this will work
        public virtual ICollection<Room> Rooms { get; set; }
        public virtual ICollection<RoomAmenity> Amenities { get; set; }
    }
} 