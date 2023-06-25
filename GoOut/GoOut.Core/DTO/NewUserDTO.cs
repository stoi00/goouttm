using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.DTO
{
    public class NewUserDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }   
        public int Age { get; set; }
        public string Photo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
