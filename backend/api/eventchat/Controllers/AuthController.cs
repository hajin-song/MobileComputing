using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace eventchat.Controllers
{
    [RoutePrefix("api/Auth")]
    public class AuthController : ApiController
    {
        private UserAuthRepository repo;

        public AuthController()
        {
            repo = new UserAuthRepository();
        }

        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(User user)
        {
            IdentityUser identUser = new IdentityUser{ UserName = user.UserName };

            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var newUser = await repo.Register(user);
            IHttpActionResult err = GetErrorResult(newUser);
            if(err != null) { return err; }
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repo.Dispose();
            }
            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if(result == null) { return InternalServerError();  }
            if(!result.Succeeded)
            {
                if(result.Errors != null)
                {
                    foreach (string err in result.Errors)
                    {
                        ModelState.AddModelError("", err);
                    }
                }
                if (ModelState.IsValid)
                {
                    return BadRequest();
                }
                return BadRequest(ModelState);
            }
            return null;
        }

    }
}
