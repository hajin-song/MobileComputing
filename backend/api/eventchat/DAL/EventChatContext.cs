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

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}