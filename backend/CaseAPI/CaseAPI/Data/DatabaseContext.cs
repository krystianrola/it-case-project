using Microsoft.EntityFrameworkCore;

namespace CaseAPI.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
    }
}
