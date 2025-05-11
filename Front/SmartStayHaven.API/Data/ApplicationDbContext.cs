using Microsoft.EntityFrameworkCore;
using SmartStayHaven.API.Models;

namespace SmartStayHaven.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<MaintenanceRequest> MaintenanceRequests { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Charge> Charges { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<RoomAmenity> RoomAmenities { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<RoomServiceOrder> RoomServiceOrders { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<Maintenance> Maintenance { get; set; }
        public DbSet<Housekeeping> Housekeeping { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public DbSet<MaintenanceType> MaintenanceTypes { get; set; }
        public DbSet<MaintenanceStatus> MaintenanceStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<MaintenanceRequest>()
                .HasOne(m => m.AssignedTo)
                .WithMany()
                .HasForeignKey(m => m.AssignedToId)
                .OnDelete(DeleteBehavior.SetNull);

            // Configure Booking entity
            modelBuilder.Entity<Booking>()
                .Property(b => b.TotalAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Charge>()
                .Property(c => c.Amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Charge>()
                .Property(c => c.UnitPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Charge>()
                .Property(c => c.Quantity)
                .HasPrecision(18, 2);

            modelBuilder.Entity<RoomType>()
                .Property(rt => rt.BaseRate)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<RoomServiceOrder>()
                .Property(rso => rso.TotalAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Room>()
                .HasOne(r => r.RoomType)
                .WithMany(rt => rt.Rooms) // Reference the inverse navigation property
                .HasForeignKey(r => r.RoomTypeId) // Use the lambda, NOT the string
                .OnDelete(DeleteBehavior.Restrict);

            // Configure RoomAmenity relationship with Room
            modelBuilder.Entity<RoomAmenity>()
                .HasOne(ra => ra.Room)
                .WithMany()
                .HasForeignKey(ra => ra.RoomId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure RoomServiceOrder relationships
            modelBuilder.Entity<RoomServiceOrder>()
                .HasOne(rso => rso.Booking)
                .WithMany()
                .HasForeignKey(rso => rso.BookingId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RoomServiceOrder>()
                .HasOne(rso => rso.AssignedTo)
                .WithMany()
                .HasForeignKey(rso => rso.AssignedToId)
                .OnDelete(DeleteBehavior.SetNull);

            // Configure Guest relationship with Booking
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Guest)
                .WithMany(g => g.Bookings)
                .HasForeignKey(b => b.GuestId);

            // Configure Room relationship with Booking
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Room)
                .WithMany(r => r.Bookings)
                .HasForeignKey(b => b.RoomId);

            // Configure Maintenance relationship with Room
            modelBuilder.Entity<Maintenance>()
                .HasOne(m => m.Room)
                .WithMany(r => r.Maintenance)
                .HasForeignKey(m => m.RoomId);

            // Configure Housekeeping relationship with Room
            modelBuilder.Entity<Housekeeping>()
                .HasOne(h => h.Room)
                .WithMany(r => r.Housekeeping)
                .HasForeignKey(h => h.RoomId);

            modelBuilder.Entity<Currency>()
                .Property(c => c.ExchangeRate)
                .HasPrecision(18, 6);

            modelBuilder.Entity<Maintenance>()
                .Property(m => m.Cost)
                .HasPrecision(18, 2);

            modelBuilder.Entity<MaintenanceRequest>()
                .Property(m => m.ActualCost)
                .HasPrecision(18, 2);

            modelBuilder.Entity<MaintenanceRequest>()
                .Property(m => m.EstimatedCost)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Service>()
                .Property(s => s.Price)
                .HasPrecision(18, 2);
        }
    }
}