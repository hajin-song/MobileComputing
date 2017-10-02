using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using eventchat.Models;

namespace eventchat.DAL
{
    public class EventChatContext : DbContext
    {
        public EventChatContext() : base("EventChatContext")
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Value> Values { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}