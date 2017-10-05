using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using eventchat.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace eventchat.DAL
{
    public class EventChatContext : IdentityDbContext<User>
    {
        public EventChatContext() : base("EventChatContext")
        {

        }
        public DbSet<EventType> EventTypes { get; set; }
        public DbSet<Value> Values { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });

        }
    }
}