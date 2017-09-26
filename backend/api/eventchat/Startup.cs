using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http;

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
            // HttpConfiguration used for API routing
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            // Connect WebAPI to OWIN server
            app.UseWebApi(config);
        }
    }
}
