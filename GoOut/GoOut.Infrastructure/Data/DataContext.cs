using GoOut.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GoOut.Infrastructure.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlServer("Server=(LocalDb)\\gooutdatabase;Database=GoOut;Trusted_Connection=True;TrustServerCertificate=True;");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasMany(t => t.LikedEvents)
                .WithMany(g => g.LikedUsers);
            modelBuilder.Entity<User>().HasMany(t => t.CreatedEvents)
                .WithOne(g => g.CreatedUser)
                .HasForeignKey(g => g.CreatedUserID).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
