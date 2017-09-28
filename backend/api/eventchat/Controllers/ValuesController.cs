using eventchat.DAL;
using eventchat.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace eventchat.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        [System.Web.Http.Authorize]
        public List<Value> Get()
        {
            List<Value> values;
            using (EventChatContext ctx = new  EventChatContext())
            {
                values = ctx.Values.ToList();
            }
            return values;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
