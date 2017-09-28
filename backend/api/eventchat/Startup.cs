using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using eventchat.Providers;

// Thie states that the class will run on start
[assembly: OwinStartup(typeof(eventchat.Startup))]
namespace eventchat
{
    public partial class Startup
    {
        // IAppBuilder provided by the host and is an
        // interface for composing application for OWIN server
        public void Configuration(IAppBuilder app)
        {
           
            ConfigureOAuth(app);

            // HttpConfiguration used for API routing
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            // Connect WebAPI to OWIN server
            app.UseWebApi(config);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new SimpleAuthorizationServerProvider() //How should crendetials be validated
            };

            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}
