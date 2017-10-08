using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.Models.Wrappers
{
    /// <summary>
    /// Wrapper for User object during GET request for index
    /// </summary>
    public class UserIndex
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Subscribed { get; set; }
    }
}