using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GoOut.Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public DateTime Date_Time { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public Categories Category { get; set; }
        public string EntryFee { get; set; }
        public Categories Categories { get; set; }
        public ICollection<User> LikedUsers { get; set; }
        public Guid CreatedUserID { get; set; }
        public User CreatedUser { get; set; }
    }
}
