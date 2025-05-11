using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Data;
using SmartStayHaven.API.Models;

namespace SmartStayHaven.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments(
            [FromQuery] string? status,
            [FromQuery] string? paymentMethod,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var query = _context.Payments
                .Include(p => p.Booking)
                .ThenInclude(b => b.Guest)
                .AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(p => p.Status == status);

            if (!string.IsNullOrEmpty(paymentMethod))
                query = query.Where(p => p.PaymentMethod == paymentMethod);

            if (startDate.HasValue)
                query = query.Where(p => p.CreatedAt >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(p => p.CreatedAt <= endDate.Value);

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _context.Payments
                .Include(p => p.Booking)
                .ThenInclude(b => b.Guest)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (payment == null)
                return NotFound();

            return payment;
        }

        [HttpPost]
        public async Task<ActionResult<Payment>> CreatePayment(Payment payment)
        {
            var booking = await _context.Bookings.FindAsync(payment.BookingId);
            if (booking == null)
                return BadRequest("Invalid booking ID");

            payment.CreatedAt = DateTime.UtcNow;
            payment.Status = "Pending";
            payment.Reference = $"REF-{DateTime.UtcNow.Ticks}";

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, Payment payment)
        {
            if (id != payment.Id)
                return BadRequest();

            var existingPayment = await _context.Payments.FindAsync(id);
            if (existingPayment == null)
                return NotFound();

            if (payment.Status == "Completed" && existingPayment.Status != "Completed")
                payment.ProcessedAt = DateTime.UtcNow;

            _context.Entry(existingPayment).CurrentValues.SetValues(payment);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpPost("{id}/process")]
        public async Task<ActionResult<Payment>> ProcessPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
                return NotFound();

            if (payment.Status == "Completed")
                return BadRequest("Payment is already processed");

            payment.Status = "Completed";
            payment.ProcessedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(payment);
        }

        private bool PaymentExists(int id)
        {
            return _context.Payments.Any(e => e.Id == id);
        }
    }
} 