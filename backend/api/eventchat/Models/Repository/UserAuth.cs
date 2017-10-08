using eventchat.DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace eventchat.Models.Repository
{
    /// <summary>
    /// Override UserManager to use Custom User model
    /// </summary>
    public class CustomManager : UserManager<User>
    {
        EventChatContext db;

        public CustomManager(IUserStore<User> store, EventChatContext db) : base(store)
        {
            this.db = db;    
        }

        // Override - we are not salting the password at this stage of development
        public override Task<User> FindAsync(string userName, string password)
        {
            return db.Users.Where(x => x.UserName.Equals(userName) && x.Password.Equals(password)).FirstOrDefaultAsync();
        }
    }

    public class UserAuthRepository : IDisposable
    {
        private EventChatContext db;
        private CustomManager manager;

        public UserAuthRepository()
        {
            db = new EventChatContext();
            manager = new CustomManager(new UserStore<User>(db), db);
        }

        public async Task<IdentityResult> Register(User user)
        {
            var result = await manager.CreateAsync(user);
            return result;
        }

        public async Task<User> Find(string userName, string password)
        {
            User user = await manager.FindAsync(userName, password);
            return user;
        }

        public void Dispose()
        {
            manager.Dispose();
            db.Dispose();
        }
    }
}