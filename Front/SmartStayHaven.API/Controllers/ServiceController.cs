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
    public class ServiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            return await _context.Services
                .Where(s => s.IsActive)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetService(int id)
        {
            var service = await _context.Services.FindAsync(id);

            if (service == null || !service.IsActive)
            {
                return NotFound();
            }

            return service;
        }

        [HttpPost]
        public async Task<ActionResult<Service>> CreateService(Service service)
        {
            service.CreatedAt = DateTime.UtcNow;
            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, Service service)
        {
            if (id != service.Id)
            {
                return BadRequest();
            }

            var existingService = await _context.Services.FindAsync(id);
            if (existingService == null || !existingService.IsActive)
            {
                return NotFound();
            }

            service.UpdatedAt = DateTime.UtcNow;
            _context.Entry(existingService).CurrentValues.SetValues(service);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null || !service.IsActive)
            {
                return NotFound();
            }

            service.IsActive = false;
            service.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Service>>> GetServicesByCategory(string category)
        {
            return await _context.Services
                .Where(s => s.Category == category && s.IsActive)
                .ToListAsync();
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<Service>>> GetAvailableServices()
        {
            return await _context.Services
                .Where(s => s.IsAvailable && s.IsActive)
                .ToListAsync();
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.Id == id && e.IsActive);
        }
    }
} 