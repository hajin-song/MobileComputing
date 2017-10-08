using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace eventchat.Models.Wrappers
{
    /// <summary>
    /// Wrapper for User object during POST request
    /// </summary>
    public class UserPost
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ConfirmPassword { get; set; }
        public string Address { get; set; }
    }
}