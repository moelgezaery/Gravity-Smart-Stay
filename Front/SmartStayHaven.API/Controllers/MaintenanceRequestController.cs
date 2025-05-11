using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Data;
using SmartStayHaven.API.Models;

namespace SmartStayHaven.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceRequestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MaintenanceRequestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceRequest>>> GetMaintenanceRequests(
            [FromQuery] int? roomId = null,
            [FromQuery] string? status = null,
            [FromQuery] string? priority = null,
            [FromQuery] int? assignedToId = null)
        {
            var query = _context.MaintenanceRequests
                .Include(m => m.Room)
                .Include(m => m.AssignedTo)
                .AsQueryable();

            if (roomId.HasValue)
                query = query.Where(m => m.RoomId == roomId.Value);

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(m => m.Status == status);

            if (!string.IsNullOrWhiteSpace(priority))
                query = query.Where(m => m.Priority == priority);

            if (assignedToId.HasValue)
                query = query.Where(m => m.AssignedToId == assignedToId.Value);

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaintenanceRequest>> GetMaintenanceRequest(int id)
        {
            var request = await _context.MaintenanceRequests
                .Include(m => m.Room)
                .Include(m => m.AssignedTo)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (request == null)
                return NotFound();

            return request;
        }

        [HttpPost]
        public async Task<ActionResult<MaintenanceRequest>> CreateMaintenanceRequest(MaintenanceRequest request)
        {
            _context.MaintenanceRequests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaintenanceRequest), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaintenanceRequest(int id, MaintenanceRequest request)
        {
            if (id != request.Id)
                return BadRequest();

            request.LastUpdated = DateTime.UtcNow;
            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaintenanceRequestExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteMaintenanceRequest(int id, [FromBody] string resolutionNotes)
        {
            var request = await _context.MaintenanceRequests.FindAsync(id);
            if (request == null)
                return NotFound();

            request.Status = "Completed";
            request.ResolutionNotes = resolutionNotes;
            request.CompletedAt = DateTime.UtcNow;
            request.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/assign")]
        public async Task<IActionResult> AssignMaintenanceRequest(int id, [FromBody] int assignedToId)
        {
            var request = await _context.MaintenanceRequests.FindAsync(id);
            if (request == null)
                return NotFound();

            request.AssignedToId = assignedToId;
            request.Status = "InProgress";
            request.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaintenanceRequest(int id)
        {
            var request = await _context.MaintenanceRequests.FindAsync(id);
            if (request == null)
                return NotFound();

            _context.MaintenanceRequests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MaintenanceRequestExists(int id)
        {
            return _context.MaintenanceRequests.Any(e => e.Id == id);
        }
    }
} 