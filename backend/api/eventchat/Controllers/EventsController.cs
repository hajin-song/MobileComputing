using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using eventchat.DAL;
using eventchat.Models;
using System.Device.Location;
using eventchat.Models.Wrappers;

namespace eventchat.Controllers
{
    [RoutePrefix("api/events")]
    [Authorize]
    public class EventsController : ApiController
    {
        private EventChatContext db = new EventChatContext();

        [HttpGet]
        [AllowAnonymous]
        [Route("index")]
        public List<Event> GetEvents(string longitude, string latitude)
        {
            List<Event> result = new List<Event>();
            
            var events = db.Events.Include("images").Include("user").Include("type").ToList();
            GeoCoordinate centre = new GeoCoordinate(double.Parse(latitude), double.Parse(longitude));
            foreach(Event evt in events)
            {
                GeoCoordinate cur = new GeoCoordinate(evt.Latitude, evt.Longitude);
                if(centre.GetDistanceTo(cur) <= 20)
                {
                    result.Add(evt);
                }
            }
            return result;
        }


        // POST: api/Events
        [Route("index")]
        [ResponseType(typeof(Event))]
        public IHttpActionResult PostEvent(EventPost evt)
        {
            try
            {
                User user = db.Users.FirstOrDefault(x => x.UserName.Equals(evt.UserName));
                if(user == null)
                {
                    return BadRequest("Invalid Username!");
                }
                Event dbEvent = new Event { Name = evt.Name, Detail = evt.Detail, Latitude = evt.Latitude, Longitude = evt.Longitude, user = user, Date = DateTime.Now };
                db.Entry(dbEvent).State = EntityState.Added;

                db.Events.Add(dbEvent);
                db.SaveChanges();

                return Ok();
            }catch(Exception e)
            {
                return BadRequest("Event Could not be saved!");
            }
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventExists(int id)
        {
            return db.Events.Count(e => e.EventID == id) > 0;
        }
    }
}