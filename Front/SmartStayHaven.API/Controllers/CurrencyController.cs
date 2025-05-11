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
    public class CurrencyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CurrencyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Currency>>> GetCurrencies()
        {
            return await _context.Currencies
                .Where(c => c.IsActive)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Currency>> GetCurrency(int id)
        {
            var currency = await _context.Currencies.FindAsync(id);

            if (currency == null || !currency.IsActive)
            {
                return NotFound();
            }

            return currency;
        }

        [HttpPost]
        public async Task<ActionResult<Currency>> CreateCurrency(Currency currency)
        {
            if (currency.IsDefault)
            {
                // If this is set as default, unset any existing default
                var existingDefault = await _context.Currencies
                    .FirstOrDefaultAsync(c => c.IsDefault && c.IsActive);
                if (existingDefault != null)
                {
                    existingDefault.IsDefault = false;
                    existingDefault.UpdatedAt = DateTime.UtcNow;
                }
            }

            currency.CreatedAt = DateTime.UtcNow;
            _context.Currencies.Add(currency);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCurrency), new { id = currency.Id }, currency);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCurrency(int id, Currency currency)
        {
            if (id != currency.Id)
            {
                return BadRequest();
            }

            var existingCurrency = await _context.Currencies.FindAsync(id);
            if (existingCurrency == null || !existingCurrency.IsActive)
            {
                return NotFound();
            }

            if (currency.IsDefault && !existingCurrency.IsDefault)
            {
                // If this is being set as default, unset any existing default
                var currentDefault = await _context.Currencies
                    .FirstOrDefaultAsync(c => c.IsDefault && c.IsActive && c.Id != id);
                if (currentDefault != null)
                {
                    currentDefault.IsDefault = false;
                    currentDefault.UpdatedAt = DateTime.UtcNow;
                }
            }

            currency.UpdatedAt = DateTime.UtcNow;
            _context.Entry(existingCurrency).CurrentValues.SetValues(currency);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CurrencyExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurrency(int id)
        {
            var currency = await _context.Currencies.FindAsync(id);
            if (currency == null || !currency.IsActive)
            {
                return NotFound();
            }

            if (currency.IsDefault)
            {
                return BadRequest("Cannot delete the default currency");
            }

            currency.IsActive = false;
            currency.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("default")]
        public async Task<ActionResult<Currency>> GetDefaultCurrency()
        {
            var defaultCurrency = await _context.Currencies
                .FirstOrDefaultAsync(c => c.IsDefault && c.IsActive);

            if (defaultCurrency == null)
            {
                return NotFound();
            }

            return defaultCurrency;
        }

        private bool CurrencyExists(int id)
        {
            return _context.Currencies.Any(e => e.Id == id && e.IsActive);
        }
    }
} 