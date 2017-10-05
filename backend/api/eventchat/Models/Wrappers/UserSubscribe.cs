using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.Models.Wrappers
{
    public class UserSubscribe
    {
        public int sourceUserID { get; set; }
        public int targetUserID { get; set; }
    }
}