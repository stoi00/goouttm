using GoOut.Core.DTO;
using GoOut.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.Queries.Users
{
    public class GetByEmailQuery:IRequest<UserDTO>
    {
        public string Email { get; set; }
    }
}
