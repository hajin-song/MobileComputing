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

        [Required]
        [Display(Name = "Content")]
        public string Content { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Date")]
        public DateTime Date { get; set; }

        [Required]
        [Display(Name = "Longitude")]
        public Double Longitude { get; set; }

        [Required]
        [Display(Name ="Latitude")]
        public Double Latitude { get; set; }

        
        public int? UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual User user { get; set; }

        public int? EventID { get; set; }
        [ForeignKey("EventID")]
        public virtual Event evt { get; set; } //event reserved

        public virtual ICollection<Image> images { get; set; }
    }
}