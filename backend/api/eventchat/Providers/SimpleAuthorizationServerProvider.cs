using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Repository;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
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
                user = await repo.Find(context.UserName, context.Password);
                if (user == null)
                {
                    context.SetError("Invalid Credential", "The Username or Password is incorrect");
                    return;
                }
            }
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));
            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                        "as:client_id", (context.ClientId == null) ? string.Empty : context.ClientId
                    },
                    {
                        "firstName", user.FirstName
                    },
                    {
                        "lastName", user.LastName
                    }
                });
            var ticket = new AuthenticationTicket(identity, props);

            // Set Token

            identity.AddClaim(new Claim(ClaimTypes.Role, user.FirstName));
            identity.AddClaim(new Claim(ClaimTypes.Role, user.LastName));
            context.Validated(ticket);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}