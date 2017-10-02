using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eventchat.Models
{
    public class Comment
    {
        public Comment()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentID { get; set; }
        public Image image { get; set; }
        public string comment { get; set; }
        public DateTime date { get; set; }
    }
}