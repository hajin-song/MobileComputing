using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eventchat.Models
{
    public class Event
    {
        public Event()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EventID { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name = "Title")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Detail")]
        public string Detail { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Date")]
        public DateTime Date { get; set; }

        [Required]
        [Display(Name = "Longitude")]
        public Double Longitude { get; set; }

        [Required]
        [Display(Name = "Latitude")]
        public Double Latitude { get; set; }

        public EventType type { get; set; }
        public virtual ICollection<Comment> comments { get; set; }
        public virtual ICollection<Image> images { get; set; }
    }
}