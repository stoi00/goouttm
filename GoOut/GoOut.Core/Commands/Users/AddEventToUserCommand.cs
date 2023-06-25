using GoOut.Core.DTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.Commands.Users
{
    public class AddEventToUserCommand:IRequest
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
    }
}
