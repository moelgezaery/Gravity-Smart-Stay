using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Data;
using SmartStayHaven.API.Models;

namespace SmartStayHaven.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees(
            [FromQuery] string? department,
            [FromQuery] string? status,
            [FromQuery] string? searchTerm)
        {
            var query = _context.Employees.AsQueryable();

            if (!string.IsNullOrEmpty(department))
                query = query.Where(e => e.Department == department);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(e => e.Status == status);

            if (!string.IsNullOrEmpty(searchTerm))
            {
                searchTerm = searchTerm.ToLower();
                query = query.Where(e =>
                    e.Name.ToLower().Contains(searchTerm) ||
                    e.Position.ToLower().Contains(searchTerm) ||
                    e.Email.ToLower().Contains(searchTerm));
            }

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
                return NotFound();

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            employee.CreatedAt = DateTime.UtcNow;
            employee.EmployeeId = $"E{DateTime.UtcNow.Ticks % 1000:D3}";

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
                return BadRequest();

            var existingEmployee = await _context.Employees.FindAsync(id);
            if (existingEmployee == null)
                return NotFound();

            employee.LastUpdated = DateTime.UtcNow;
            employee.EmployeeId = existingEmployee.EmployeeId; // Preserve the original EmployeeId

            _context.Entry(existingEmployee).CurrentValues.SetValues(employee);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return NotFound();

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<ActionResult<Employee>> UpdateEmployeeStatus(int id, [FromBody] string status)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
                return NotFound();

            employee.Status = status;
            employee.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
} 