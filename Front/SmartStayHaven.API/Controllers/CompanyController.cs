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
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CompanyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies
                .Where(c => c.IsActive)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);

            if (company == null || !company.IsActive)
            {
                return NotFound();
            }

            return company;
        }

        [HttpPost]
        public async Task<ActionResult<Company>> CreateCompany(Company company)
        {
            company.CreatedAt = DateTime.UtcNow;
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }

            var existingCompany = await _context.Companies.FindAsync(id);
            if (existingCompany == null || !existingCompany.IsActive)
            {
                return NotFound();
            }

            company.UpdatedAt = DateTime.UtcNow;
            _context.Entry(existingCompany).CurrentValues.SetValues(company);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company == null || !company.IsActive)
            {
                return NotFound();
            }

            company.IsActive = false;
            company.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}/employees")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetCompanyEmployees(int id)
        {
            var company = await _context.Companies
                .Include(c => c.Employees)
                .FirstOrDefaultAsync(c => c.Id == id && c.IsActive);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company.Employees);
        }

        [HttpGet("{id}/bookings")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetCompanyBookings(int id)
        {
            var company = await _context.Companies
                .Include(c => c.Bookings)
                .FirstOrDefaultAsync(c => c.Id == id && c.IsActive);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company.Bookings);
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id && e.IsActive);
        }
    }
} 