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
    public class RoomTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomType>>> GetRoomTypes()
        {
            return await _context.RoomTypes
                .Include(rt => rt.Amenities)
                .Where(rt => rt.IsActive)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomType>> GetRoomType(int id)
        {
            var roomType = await _context.RoomTypes
                .Include(rt => rt.Amenities)
                .FirstOrDefaultAsync(rt => rt.Id == id && rt.IsActive);

            if (roomType == null)
            {
                return NotFound();
            }

            return roomType;
        }

        [HttpPost]
        public async Task<ActionResult<RoomType>> CreateRoomType(RoomType roomType)
        {
            roomType.CreatedAt = DateTime.UtcNow;
            _context.RoomTypes.Add(roomType);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomType), new { id = roomType.Id }, roomType);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomType(int id, RoomType roomType)
        {
            if (id != roomType.Id)
            {
                return BadRequest();
            }

            var existingRoomType = await _context.RoomTypes.FindAsync(id);
            if (existingRoomType == null || !existingRoomType.IsActive)
            {
                return NotFound();
            }

            roomType.UpdatedAt = DateTime.UtcNow;
            _context.Entry(existingRoomType).CurrentValues.SetValues(roomType);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomTypeExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null || !roomType.IsActive)
            {
                return NotFound();
            }

            roomType.IsActive = false;
            roomType.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/rooms")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoomTypeRooms(int id)
        {
            var roomType = await _context.RoomTypes
                .Include(rt => rt.Rooms)
                .FirstOrDefaultAsync(rt => rt.Id == id && rt.IsActive);

            if (roomType == null)
            {
                return NotFound();
            }

            return Ok(roomType.Rooms);
        }

        [HttpGet("{id}/amenities")]
        public async Task<ActionResult<IEnumerable<RoomAmenity>>> GetRoomTypeAmenities(int id)
        {
            var roomType = await _context.RoomTypes
                .Include(rt => rt.Amenities)
                .FirstOrDefaultAsync(rt => rt.Id == id && rt.IsActive);

            if (roomType == null)
            {
                return NotFound();
            }

            return Ok(roomType.Amenities);
        }

        private bool RoomTypeExists(int id)
        {
            return _context.RoomTypes.Any(e => e.Id == id && e.IsActive);
        }
    }
} 