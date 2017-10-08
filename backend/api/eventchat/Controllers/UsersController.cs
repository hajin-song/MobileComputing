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

        [HttpGet]
        [Route("index")]
        public List<UserIndex> Index(String userName)
        {
            List<string> userSubscription = db.Subscriptions.Where(x => x.subscribedUser.UserName.Equals(userName)).Select(x => x.subscriptionUser.UserName).ToList();
            List<UserIndex> users = db.Users.Where(x => !x.UserName.Equals(userName)).Select(x => new UserIndex { FirstName = x.FirstName, LastName = x.LastName, UserName = x.UserName }).ToList();
            foreach(UserIndex user in users)
            {
                if (userSubscription.Contains(user.UserName))
                {
                    user.Subscribed = true;
                }else
                {
                    user.Subscribed = false;
                }
            }
            return users;
        }

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

        [Route("updatepassword")]
        [ResponseType(typeof(void))]
        public IHttpActionResult UpdatePassword(UserPost user)
        {
            User dbUser = db.Users.Where(x => x.UserName.Equals(user.UserName)).FirstOrDefault();
            if (dbUser == null) { return NotFound(); }
            if(user.Password != null)
            {
                if (user.Password.Equals(user.ConfirmPassword))
                {
                    dbUser.Password = user.Password;
                }
                else
                {
                    return BadRequest("Password does not match!");
                }
            }
            else
            {
                return BadRequest("Invalid Password!");
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
        public IHttpActionResult Subscribe(UserSubscription userSubscription)
        {
            try
            {
                User requestUser = db.Users.FirstOrDefault(x => x.UserName.Equals(userSubscription.UserName));
                User targetUser = db.Users.FirstOrDefault(x => x.UserName.Equals(userSubscription.targetUserName));
                if (requestUser == null || targetUser == null || requestUser.UserName.Equals(targetUser.UserName))
                {
                    return BadRequest("Invalid Subscription Users!");
                }
                Subscription existingSub = db.Subscriptions.FirstOrDefault(x =>
                    x.subscribedUser.UserName.Equals(requestUser.UserName) &&
                    x.subscriptionUser.UserName.Equals(targetUser.UserName)
                );
                if (userSubscription.isSubscribing)
                {
                    if (existingSub != null)
                    {
                        return BadRequest("You are already subscribed!");
                    }
                    Subscription subscription = new Subscription();
                    subscription.subscribedUser = requestUser;
                    subscription.subscriptionUser = targetUser;
                    db.Entry(subscription).State = EntityState.Added;
                    db.Subscriptions.Add(subscription);
                }
                else
                {
                    if (existingSub == null)
                    {
                        return BadRequest("You are not subscribed to the user!");
                    }
                    db.Entry(existingSub).State = EntityState.Deleted;
                    db.Subscriptions.Remove(existingSub);
                }
                db.SaveChanges();
            }catch(Exception e) { 
                return BadRequest("Could not process the subscription request! - " + e.Message);
            }
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