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
    public class RoomAmenityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomAmenityController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomAmenity>>> GetRoomAmenities()
        {
            return await _context.RoomAmenities
                .Where(ra => ra.IsActive)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomAmenity>> GetRoomAmenity(int id)
        {
            var roomAmenity = await _context.RoomAmenities.FindAsync(id);

            if (roomAmenity == null || !roomAmenity.IsActive)
            {
                return NotFound();
            }

            return roomAmenity;
        }

        [HttpPost]
        public async Task<ActionResult<RoomAmenity>> CreateRoomAmenity(RoomAmenity roomAmenity)
        {
            roomAmenity.CreatedAt = DateTime.UtcNow;
            _context.RoomAmenities.Add(roomAmenity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomAmenity), new { id = roomAmenity.Id }, roomAmenity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomAmenity(int id, RoomAmenity roomAmenity)
        {
            if (id != roomAmenity.Id)
            {
                return BadRequest();
            }

            var existingRoomAmenity = await _context.RoomAmenities.FindAsync(id);
            if (existingRoomAmenity == null || !existingRoomAmenity.IsActive)
            {
                return NotFound();
            }

            roomAmenity.UpdatedAt = DateTime.UtcNow;
            _context.Entry(existingRoomAmenity).CurrentValues.SetValues(roomAmenity);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomAmenityExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomAmenity(int id)
        {
            var roomAmenity = await _context.RoomAmenities.FindAsync(id);
            if (roomAmenity == null || !roomAmenity.IsActive)
            {
                return NotFound();
            }

            roomAmenity.IsActive = false;
            roomAmenity.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/room-types")]
        public async Task<ActionResult<IEnumerable<RoomType>>> GetRoomAmenityRoomTypes(int id)
        {
            var roomAmenity = await _context.RoomAmenities
                .Include(ra => ra.RoomTypes)
                .FirstOrDefaultAsync(ra => ra.Id == id && ra.IsActive);

            if (roomAmenity == null)
            {
                return NotFound();
            }

            return Ok(roomAmenity.RoomTypes);
        }

        private bool RoomAmenityExists(int id)
        {
            return _context.RoomAmenities.Any(e => e.Id == id && e.IsActive);
        }
    }
} 