using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace eventchat.Models
{
    public class User
    {
        public User()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name ="Password")]
        public string Password { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name ="First Name")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [Column(TypeName = "BIT")]
        [Display(Name = "Authority?")]
        public bool Authority { get; set; }

        [Required]
        [Column(TypeName = "varchar(max)")]
        [Display(Name = "Address")]
        public string Address { get; set; }

        public virtual ICollection<Comment> comments { get; set; }
    }
}