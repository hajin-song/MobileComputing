using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.Models.Wrappers
{
    /// <summary>
    /// Wrapper for Event Object during POST request
    /// </summary>
    public class EventPost
    {
        public string Name { get; set; }
        public string Detail { get; set; }
        public Double Longitude { get; set; }
        public Double Latitude { get; set; }
        public string UserName { get; set; }
    }
}