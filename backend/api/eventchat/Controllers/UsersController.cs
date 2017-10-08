using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Wrappers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Description;

namespace eventchat.Controllers
{
    [RoutePrefix("api/users")]
    [Authorize]
    public class UsersController : ApiController
    {
        private EventChatContext db = new EventChatContext();

        [HttpGet]
        [Route("index")]
        /// Index : List<UserIndex>
        /// Return List of Users
        /// Current behaviour retrieves ALL users, but in actual production it should use the address field to get nearest users only
        /// <param name="userName">User Getting the User Index</param>
        /// <returns type="List<UserIndex>">List of Users (wrapper to avoid password leak)</returns>
        public List<UserIndex> Index(String userName)
        {
            List<string> userSubscription = db.Subscriptions.Where(x => x.subscribedUser.UserName.Equals(userName)).Select(x => x.subscriptionUser.UserName).ToList();
            List<UserIndex> users = db.Users.
                Where(x => !x.UserName.Equals(userName)).
                Select(x => new UserIndex { FirstName = x.FirstName, LastName = x.LastName, UserName = x.UserName }).
                ToList();
            foreach(UserIndex user in users)
            {
                // Set their subscribed flag
                user.Subscribed = userSubscription.Contains(user.UserName) ? true : false;
            }
            return users;
        }

        [Route("update")]
        [ResponseType(typeof(void))]
        /// Update : IHttpActionResult
        /// Update the User Information
        /// Uses Wrapper Object to take advantage of WebAPI's object mapping behaviour
        /// <param name="user">User Information</param>
        /// <returns type="IHttpActionResult>">HTTP Request Result with message on error</returns>
        public IHttpActionResult Update(UserPost user)
        {
            // User table columns can grow in future - use reflection to deal with updating
            // Disable proxy so GetFields gets actual Model instead of Proxy object
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
                // Was a value given?
                var newVal = field.GetValue(user);
                if (newVal == null) { continue; }
                // If so, update it on the target model
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
        /// UpdatePassword : IHttpActionResult
        /// Update the User Password
        /// Uses Wrapper Object to take advantage of WebAPI's object mapping behaviour
        /// <param name="user">User Information</param>
        /// <returns type="IHttpActionResult>">HTTP Request Result with message on error</returns>
        public IHttpActionResult UpdatePassword(UserPost user)
        {
            User dbUser = db.Users.FirstOrDefault(x => x.UserName.Equals(user.UserName));
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
        /// Subscribe : IHttpActionResult
        /// Subscribe to a User
        /// Uses Wrapper Object to take advantage of WebAPI's object mapping behaviour
        /// <param name="userSubscription">User Subscription Request</param>
        /// <returns type="IHttpActionResult>">HTTP Request Result with message on error</returns>
        public IHttpActionResult Subscribe(UserSubscription userSubscription)
        {
            try
            {
                User requestUser = db.Users.FirstOrDefault(x => x.UserName.Equals(userSubscription.UserName));
                User targetUser = db.Users.FirstOrDefault(x => x.UserName.Equals(userSubscription.targetUserName));
                // Check if it is a valid request - both users provided and is not subscribing to itself
                if (requestUser == null || targetUser == null || requestUser.UserName.Equals(targetUser.UserName))
                {
                    return BadRequest("Invalid Subscription Users!");
                }
                // Check if a subscription object already exists between two users
                Subscription existingSub = db.Subscriptions.FirstOrDefault(x =>
                    x.subscribedUser.UserName.Equals(requestUser.UserName) &&
                    x.subscriptionUser.UserName.Equals(targetUser.UserName)
                );

                if (userSubscription.isSubscribing)
                {
                    // Case 1 - User is subscribing
                    // Do not allow duplicate subscription
                    if (existingSub != null) { return BadRequest("You are already subscribed!"); }
                    Subscription subscription = new Subscription();
                    subscription.subscribedUser = requestUser;
                    subscription.subscriptionUser = targetUser;
                    db.Entry(subscription).State = EntityState.Added;
                    db.Subscriptions.Add(subscription);
                }
                else
                {
                    // Case 2 - User is unsubscribing
                    // Do not allow unsubscription of non-existing subscription
                    if (existingSub == null) { return BadRequest("You are not subscribed to the user!"); }
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