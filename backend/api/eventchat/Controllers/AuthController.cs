using eventchat.Models;
using eventchat.Models.Repository;
using eventchat.Models.Wrappers;
using Microsoft.AspNet.Identity;
using System;
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
        /// Register : Task<IHttpActionResult>
        /// Register a new user
        /// Uses Wrapper Object to take advantage of WebAPI's object mapping behaviour
        /// <param name="user">User Information</param>
        /// <returns type="Task<IHttpActionResult>">HTTP Request Result with message on error (async)</returns>
        public async Task<IHttpActionResult> Register(UserPost user)
        {
 
            User dbUser = new Models.User {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                Address = user.Address,
                DateOfBirth = DateTime.Today
            };
            IdentityResult result = await repo.Register(dbUser);
            IHttpActionResult errResult = GetErrorResult(result);
            if (errResult != null) { return errResult; }
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

        /// GetErrorResult : Task<IHttpActionResult>
        /// Get any error resulting from Authentication request
        /// <param name="result">Auth Result</param>
        /// <returns type="Task<IHttpActionResult>">HTTP Request Result with message on error (async)</returns>
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
