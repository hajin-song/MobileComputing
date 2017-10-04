using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Repository;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace eventchat.Providers
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        // This one valides client - we only have one in this case
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        // This one validates the username and password against the DB
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            // Allow CORS
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            User user;
            // Does username and password combination match?
            using (UserAuthRepository repo = new UserAuthRepository())
            {
                IdentityUser identUser = await repo.Find(context.UserName, context.Password);
                if(identUser == null)
                {
                    context.SetError("Invalid Credential", "The Username or Password is incorrect");
                    return;
                }
                using (EventChatContext ctx = new EventChatContext())
                {
                    user = ctx.Users.Where(x => x.UserName.Equals(context.UserName)).FirstOrDefault(); // validated already
                }
            }

            // Set Token
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));
            identity.AddClaim(new Claim("first_name", user.FirstName));
            identity.AddClaim(new Claim("last_name", user.LastName));
            context.Validated(identity);
        }
    }
}