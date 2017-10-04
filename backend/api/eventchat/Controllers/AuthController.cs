using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Wrappers;
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
using System.Data.SqlTypes;

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
        public async Task<IHttpActionResult> Register(UserRegister user)
        {

            User dbUser = new Models.User { UserName = user.UserName, FirstName = user.FirstName, LastName = user.LastName, Password = user.Password, Address = user.Address, DateOfBirth = DateTime.Today};
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var newUser =  repo.Register(dbUser);
            if (repo.Register(dbUser) == false) { return BadRequest("Failed To Create a new User"); }
            
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
