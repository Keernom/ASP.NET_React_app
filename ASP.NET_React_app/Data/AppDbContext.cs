using ASP.NET_React_app.Data.Entities;
using LiteDB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace ASP.NET_React_app.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> contextOptions) : base(contextOptions)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated(); 
        }
    }
}
