using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace SmartStayHaven.API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context)
        {
            // Apply any pending migrations
            await context.Database.MigrateAsync();

            // Check if data already exists
            if (await context.RoomTypes.AnyAsync())
            {
                return; // Database has been seeded
            }

            // Seed RoomTypes
            var roomTypes = new List<RoomType>
            {
                new RoomType { Name = "Standard", Description = "Standard room with basic amenities", BedType = "King", MaxOccupancy = 2, BedCount = 1, BaseRate = 100.00m, HasBalcony = false   },
                new RoomType { Name = "Deluxe", Description = "Spacious room with premium amenities", BedType = "Queen", MaxOccupancy = 3, BedCount = 2, BaseRate = 150.00m, HasBalcony = true },
                new RoomType { Name = "Suite", Description = "Luxury suite with separate living area", BedType = "King", MaxOccupancy = 4, BedCount = 3, BaseRate = 200.00m, HasBalcony = true }
            };
            await context.RoomTypes.AddRangeAsync(roomTypes);

            // Seed Currencies
            var currencies = new List<Currency>
            {
                new Currency { Code = "USD", Name = "US Dollar", Symbol = "$", ExchangeRate = 1.0m, IsDefault = true },
                new Currency { Code = "EUR", Name = "Euro", Symbol = "€", ExchangeRate = 1.08m, IsDefault = false },
                new Currency { Code = "GBP", Name = "British Pound", Symbol = "£", ExchangeRate = 1.27m, IsDefault = false }
            };
            await context.Currencies.AddRangeAsync(currencies);

            // Seed Services
            var services = new List<Service>
            {
                new Service { Name = "Room Cleaning", Description = "Daily room cleaning service", Price = 0m, IsActive = true,Category = "Housekeeping" },
                new Service { Name = "Laundry", Description = "Laundry and dry cleaning service", Price = 15.00m, IsActive = true,Category = "Housekeeping" },
                new Service { Name = "Room Service", Description = "24/7 room service", Price = 0m, IsActive = true,Category = "Room Service" }
            };
            await context.Services.AddRangeAsync(services);

            // Seed MaintenanceTypes
            var maintenanceTypes = new List<MaintenanceType>
            {
                new MaintenanceType { Name = "Regular", Description = "Regular maintenance tasks" },
                new MaintenanceType { Name = "Emergency", Description = "Emergency maintenance tasks" },
                new MaintenanceType { Name = "Preventive", Description = "Preventive maintenance tasks" }
            };
            await context.MaintenanceTypes.AddRangeAsync(maintenanceTypes);

            // Seed MaintenanceStatuses
            var maintenanceStatuses = new List<MaintenanceStatus>
            {
                new MaintenanceStatus { Name = "Pending", Description = "Maintenance request is pending" },
                new MaintenanceStatus { Name = "In Progress", Description = "Maintenance is in progress" },
                new MaintenanceStatus { Name = "Completed", Description = "Maintenance has been completed" },
                new MaintenanceStatus { Name = "Cancelled", Description = "Maintenance request has been cancelled" }
            };
            await context.MaintenanceStatuses.AddRangeAsync(maintenanceStatuses);

            // Save all changes
            await context.SaveChangesAsync();
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
} 