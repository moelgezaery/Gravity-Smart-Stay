using System;
using System.ComponentModel.DataAnnotations;

namespace SmartStayHaven.API.Models
{
    public class Currency
    {
        public int Id { get; set; }

        [Required]
        [StringLength(3)]
        public string Code { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(5)]
        public string Symbol { get; set; }

        [Required]
        public decimal ExchangeRate { get; set; }

        public bool IsDefault { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
} 