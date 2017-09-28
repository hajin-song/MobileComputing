using eventchat.DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace eventchat.Models.Repository
{
    public class UserAuthRepository : IDisposable
    {
        private AuthContext db;

        private UserManager<IdentityUser> userManager;

        public UserAuthRepository()
        {
            db = new AuthContext();
            userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(db));
        }

        public async Task<IdentityResult> Register(User user)
        {
            IdentityUser identUser = new IdentityUser
            {
                UserName = user.UserName
            };

            var result = await userManager.CreateAsync(identUser, user.Password);

            return result;
        }

        public async Task<IdentityUser> Find(string userName, string password)
        {
            return await userManager.FindAsync(userName, password);
        }

        public void Dispose()
        {
            db.Dispose();
            userManager.Dispose();

        }
    }
}