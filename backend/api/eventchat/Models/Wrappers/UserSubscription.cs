using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.Models.Wrappers
{
    public class UserSubscription
    {
        public string UserName { get; set; }
        public string targetUserName { get; set; }
        public bool isSubscribing { get; set; }
    }
}