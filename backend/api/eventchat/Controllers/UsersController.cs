using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Wrappers;

namespace eventchat.Controllers
{
    [RoutePrefix("api/users")]
    [Authorize]
    public class UsersController : ApiController
    {
        private EventChatContext db = new EventChatContext();

        [Route("update")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Update(UserPost user)
        {
            db.Configuration.ProxyCreationEnabled = false;
            User dbUser = db.Users.Where(x => x.UserName.Equals(user.UserName)).FirstOrDefault();
            db.Configuration.ProxyCreationEnabled = true;
            if (dbUser == null) { return NotFound(); }
            FieldInfo[] userRegiFields = user.GetType().GetFields(BindingFlags.Instance |
                                                                   BindingFlags.Static |
                                                                   BindingFlags.NonPublic |
                                                                   BindingFlags.Public);
            FieldInfo[] userFields = dbUser.GetType().GetFields(BindingFlags.Instance |
                                                                   BindingFlags.Static |
                                                                   BindingFlags.NonPublic |
                                                                   BindingFlags.Public);
            foreach (FieldInfo field in userRegiFields)
            {
                var newVal = field.GetValue(user);
                if (newVal == null) { continue; }

                foreach (FieldInfo dbField in userFields)
                {
                    if (dbField.Name.Equals(field.Name))
                    {
                        dbField.SetValue(dbUser, newVal);
                        break;
                    }
                }

            }
            db.Entry(dbUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("subscribe")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Subscribe(UserSubscribe userSubscription)
        {
            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.UserID == id) > 0;
        }
    }
}