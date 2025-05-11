using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Data;
using SmartStayHaven.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace SmartStayHaven.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FloorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FloorController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Floor>>> GetFloors()
        {
            return await _context.Floors
                .Include(f => f.Rooms)
                .Where(f => f.IsActive)
                .OrderBy(f => f.Number)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> GetFloor(int id)
        {
            var floor = await _context.Floors
                .Include(f => f.Rooms)
                .FirstOrDefaultAsync(f => f.Id == id && f.IsActive);

            if (floor == null)
            {
                return NotFound();
            }

            return floor;
        }

        [HttpPost]
        public async Task<ActionResult<Floor>> CreateFloor(Floor floor)
        {
            // Check if floor number already exists
            if (await _context.Floors.AnyAsync(f => f.Number == floor.Number && f.IsActive))
            {
                return BadRequest("A floor with this number already exists");
            }

            floor.CreatedAt = DateTime.UtcNow;
            _context.Floors.Add(floor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFloor), new { id = floor.Id }, floor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFloor(int id, Floor floor)
        {
            if (id != floor.Id)
            {
                return BadRequest();
            }

            var existingFloor = await _context.Floors.FindAsync(id);
            if (existingFloor == null || !existingFloor.IsActive)
            {
                return NotFound();
            }

            // Check if new floor number conflicts with existing floors
            if (floor.Number != existingFloor.Number)
            {
                if (await _context.Floors.AnyAsync(f => f.Number == floor.Number && f.IsActive))
                {
                    return BadRequest("A floor with this number already exists");
                }
            }

            floor.UpdatedAt = DateTime.UtcNow;
            _context.Entry(existingFloor).CurrentValues.SetValues(floor);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FloorExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFloor(int id)
        {
            var floor = await _context.Floors
                .Include(f => f.Rooms)
                .FirstOrDefaultAsync(f => f.Id == id && f.IsActive);

            if (floor == null)
            {
                return NotFound();
            }

            // Check if floor has any rooms
            if (floor.Rooms != null && floor.Rooms.Any())
            {
                return BadRequest("Cannot delete floor with existing rooms");
            }

            floor.IsActive = false;
            floor.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/rooms")]
        public async Task<ActionResult<IEnumerable<Room>>> GetFloorRooms(int id)
        {
            var floor = await _context.Floors
                .Include(f => f.Rooms)
                .FirstOrDefaultAsync(f => f.Id == id && f.IsActive);

            if (floor == null)
            {
                return NotFound();
            }

            return Ok(floor.Rooms);
        }

        [HttpGet("number/{number}")]
        public async Task<ActionResult<Floor>> GetFloorByNumber(int number)
        {
            var floor = await _context.Floors
                .Include(f => f.Rooms)
                .FirstOrDefaultAsync(f => f.Number == number && f.IsActive);

            if (floor == null)
            {
                return NotFound();
            }

            return floor;
        }

        private bool FloorExists(int id)
        {
            return _context.Floors.Any(e => e.Id == id && e.IsActive);
        }
    }
} 