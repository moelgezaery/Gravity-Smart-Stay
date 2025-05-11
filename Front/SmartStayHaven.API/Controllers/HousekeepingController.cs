using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Models;
using SmartStayHaven.API.Data;

namespace SmartStayHaven.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HousekeepingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HousekeepingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Housekeeping
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Housekeeping>>> GetHousekeepingTasks()
        {
            return await _context.Housekeeping
                .Include(h => h.Room)
                .Include(h => h.Employee)
                .ToListAsync();
        }

        // GET: api/Housekeeping/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Housekeeping>> GetHousekeepingTask(int id)
        {
            var housekeeping = await _context.Housekeeping
                .Include(h => h.Room)
                .Include(h => h.Employee)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (housekeeping == null)
            {
                return NotFound();
            }

            return housekeeping;
        }

        // GET: api/Housekeeping/room/5
        [HttpGet("room/{roomId}")]
        public async Task<ActionResult<IEnumerable<Housekeeping>>> GetRoomHousekeepingTasks(int roomId)
        {
            return await _context.Housekeeping
                .Include(h => h.Employee)
                .Where(h => h.RoomId == roomId)
                .ToListAsync();
        }

        // GET: api/Housekeeping/employee/5
        [HttpGet("employee/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Housekeeping>>> GetEmployeeHousekeepingTasks(int employeeId)
        {
            return await _context.Housekeeping
                .Include(h => h.Room)
                .Where(h => h.EmployeeId == employeeId)
                .ToListAsync();
        }

        // GET: api/Housekeeping/status/{status}
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<Housekeeping>>> GetHousekeepingTasksByStatus(string status)
        {
            return await _context.Housekeeping
                .Include(h => h.Room)
                .Include(h => h.Employee)
                .Where(h => h.Status == status)
                .ToListAsync();
        }

        // POST: api/Housekeeping
        [HttpPost]
        public async Task<ActionResult<Housekeeping>> CreateHousekeepingTask(Housekeeping housekeeping)
        {
            _context.Housekeeping.Add(housekeeping);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHousekeepingTask), new { id = housekeeping.Id }, housekeeping);
        }

        // PUT: api/Housekeeping/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHousekeepingTask(int id, Housekeeping housekeeping)
        {
            if (id != housekeeping.Id)
            {
                return BadRequest();
            }

            housekeeping.LastUpdated = DateTime.UtcNow;
            _context.Entry(housekeeping).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HousekeepingTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Housekeeping/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHousekeepingTask(int id)
        {
            var housekeeping = await _context.Housekeeping.FindAsync(id);
            if (housekeeping == null)
            {
                return NotFound();
            }

            _context.Housekeeping.Remove(housekeeping);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HousekeepingTaskExists(int id)
        {
            return _context.Housekeeping.Any(e => e.Id == id);
        }
    }
} 