using eventchat.DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace eventchat.Models.Repository
{
    public class UserAuthRepository : IDisposable
    {
        private EventChatContext db;
       

        public UserAuthRepository()
        {
            db = new EventChatContext();
        }

        public bool Register(User user)
        {
            if (db.Users.Where(x => x.UserName.Equals(user.UserName)).FirstOrDefault() == null)
            {
                return false;
            }
            db.Users.Add(user);
            try
            {
                db.SaveChanges();
            }catch(DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                return false;
            }
            return true;
        }

        public User Find(string userName, string password)
        {
            return db.Users.Where(x => x.UserName.Equals(userName) && x.Password.Equals(password)).FirstOrDefault();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}