using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using eventchat.Models;
namespace eventchat.DAL
{
    public class EventChatInitialiser : System.Data.Entity.DropCreateDatabaseIfModelChanges<EventChatContext>
    {
        protected override void Seed(EventChatContext context)
        {

        }
    }
}