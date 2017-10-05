using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eventchat.Models.Wrappers
{
    public class CommentPost
    {
        public int userID { get; set; }
        public int eventID { get; set; }
        public int CommentID { get; set; }
        public string Content { get; set; }
    }
}