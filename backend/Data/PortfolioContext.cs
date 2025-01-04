using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Data
{
    public class PortfolioContext : DbContext
    {
        public PortfolioContext(DbContextOptions<PortfolioContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Contact> Contacts { get; set; }
    }
}
