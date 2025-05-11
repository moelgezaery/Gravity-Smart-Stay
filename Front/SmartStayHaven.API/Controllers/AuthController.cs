using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Data;
using SmartStayHaven.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace SmartStayHaven.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || request.Password == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // In a real application, you would verify the password hash here
            // For demo purposes, we're using a simple comparison
            if (user.PasswordHash != HashPassword(request.Password))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Update last login
            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Role
            });
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }

    public class LoginRequest
    {
        
        public string? Email { get; set; }
       
        public string? Password { get; set; }
    }
} 