using ASP.NET_React_app.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ASP.NET_React_app.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<UserSub> UserSubs { get; set; }
        public DbSet<Like> Likes { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> contextOptions) : base(contextOptions)
        {
            Database.EnsureCreated(); 
        }
    }
}
