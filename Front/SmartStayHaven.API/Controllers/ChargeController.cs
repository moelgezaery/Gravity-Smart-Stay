using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Data;
using SmartStayHaven.API.Models;

namespace SmartStayHaven.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChargeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ChargeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Charge>>> GetCharges(
            [FromQuery] int? bookingId,
            [FromQuery] string? category,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate)
        {
            var query = _context.Charges
                .Include(c => c.Booking)
                .ThenInclude(b => b.Guest)
                .AsQueryable();

            if (bookingId.HasValue)
                query = query.Where(c => c.BookingId == bookingId.Value);

            if (!string.IsNullOrEmpty(category))
                query = query.Where(c => c.Category == category);

            if (startDate.HasValue)
                query = query.Where(c => c.CreatedAt >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(c => c.CreatedAt <= endDate.Value);

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Charge>> GetCharge(int id)
        {
            var charge = await _context.Charges
                .Include(c => c.Booking)
                .ThenInclude(b => b.Guest)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (charge == null)
                return NotFound();

            return charge;
        }

        [HttpPost]
        public async Task<ActionResult<Charge>> CreateCharge(Charge charge)
        {
            var booking = await _context.Bookings.FindAsync(charge.BookingId);
            if (booking == null)
                return BadRequest("Invalid booking ID");

            charge.CreatedAt = DateTime.UtcNow;
            charge.CreatedAt = DateTime.UtcNow;

            if (charge.Quantity > 0 && charge.UnitPrice > 0)
                charge.Amount = charge.Quantity * charge.UnitPrice;

            _context.Charges.Add(charge);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCharge), new { id = charge.Id }, charge);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharge(int id, Charge charge)
        {
            if (id != charge.Id)
                return BadRequest();

            var existingCharge = await _context.Charges.FindAsync(id);
            if (existingCharge == null)
                return NotFound();

            if (charge.Quantity > 0 && charge.UnitPrice > 0)
                charge.Amount = charge.Quantity * charge.UnitPrice;

            _context.Entry(existingCharge).CurrentValues.SetValues(charge);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChargeExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharge(int id)
        {
            var charge = await _context.Charges.FindAsync(id);
            if (charge == null)
                return NotFound();

            _context.Charges.Remove(charge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ChargeExists(int id)
        {
            return _context.Charges.Any(e => e.Id == id);
        }
    }
} 