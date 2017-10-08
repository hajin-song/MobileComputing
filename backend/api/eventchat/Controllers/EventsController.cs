using eventchat.DAL;
using eventchat.Models;
using eventchat.Models.Wrappers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Device.Location;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;

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
        /// GetEvent : List<Event>
        /// Return List of Event object that is within 20 KM radius of given coordinate
        /// <param name="latitude">Latitude</param>
        /// <param name="longitude">Longitude</param>
        /// <returns type="List<Event>">List of Event within 20 KM radius</returns>
        public List<Event> GetEvents(string longitude, string latitude)
        {
            List<Event> result = new List<Event>();
            // Include the images, users and type of the Event
            var events = db.Events.Include("images").Include("user").Include("type").ToList();
            GeoCoordinate centre = new GeoCoordinate(double.Parse(latitude), double.Parse(longitude));
            foreach(Event evt in events)
            {
                GeoCoordinate cur = new GeoCoordinate(evt.Latitude, evt.Longitude);
                if(centre.GetDistanceTo(cur) <= 20) { result.Add(evt); }
            }
            return result;
        }


        // POST: api/Events
        [HttpPost]
        [Route("post")]
        [ResponseType(typeof(Event))]
        /// PostEvent : IHttpActionResult
        /// Handles Event Creation through Mobile App
        /// <param name="evt">EventPost : Wrapper Object for the Event</param>
        /// <returns>HTTP Request Result with message on error</returns>
        public IHttpActionResult PostEvent(EventPost evt)
        {
            try
            {
                User user = db.Users.FirstOrDefault(x => x.UserName.Equals(evt.UserName));
                // A request was made with non-existing user
                if(user == null) { return BadRequest("Invalid Username!"); }
                // Unwrap
                Event dbEvent = new Event { Name = evt.Name, Detail = evt.Detail, Latitude = evt.Latitude, Longitude = evt.Longitude, user = user, Date = DateTime.Now };
                db.Entry(dbEvent).State = EntityState.Added;
                db.Events.Add(dbEvent);
                db.SaveChanges();
                // Return the saved Event
                return Ok(JsonConvert.SerializeObject(dbEvent));
            }catch(Exception e)
            {
                return BadRequest(e.Message);
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