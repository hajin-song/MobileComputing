using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.DAL
{
    // Special kind of DbContext class for authentication usecase
    public class AuthContext : IdentityDbContext<IdentityUser>
    {
        public AuthContext() : base("EventChatContext")
        {

        }
    }
}