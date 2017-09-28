using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.Models
{
    public class Event
    {
        public Event()
        {

        }

        public int EventID { get; set; }
        public string name { get; set; }
        public EventType? type { get; set; }
        public double longitude { get; set; }
        public double latitude { get; set; }
        public string details { get; set; }
        public DateTime date { get; set; }

        public virtual ICollection<Image> images { get; set; }
    }
}