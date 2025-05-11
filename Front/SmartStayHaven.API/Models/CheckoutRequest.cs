using System.ComponentModel.DataAnnotations;

namespace SmartStayHaven.API.Models
{
    public class CheckoutRequest
    {
        public DateTime ActualCheckOutTime { get; set; } = DateTime.UtcNow;

        public string? Notes { get; set; }

        public decimal? AdditionalCharges { get; set; }

        public string? PaymentMethod { get; set; }

        public bool IsEarlyCheckout { get; set; }

        public string? Feedback { get; set; }
    }
} 