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
            var values = new List<Value>
            {
                new Value { ValueField = 1 },
                new Value { ValueField = 2 },
                new Value { ValueField = 3 },
                new Value { ValueField = 4 },
                new Value { ValueField = 15 },
                new Value { ValueField = 16 },
                new Value { ValueField = 124 },
                new Value { ValueField = 111 },
                new Value { ValueField = 125 },
                new Value { ValueField = 155 }
            };
            values.ForEach(v => context.Values.Add(v));
            context.SaveChanges();
        }
    }
}