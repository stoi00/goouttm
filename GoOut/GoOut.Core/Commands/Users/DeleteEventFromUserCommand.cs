using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.Commands.Users
{
    public class DeleteEventFromUserCommand:IRequest
    {
        public Guid UserId { get; set; }
        public Guid EventId { get; set; }
    }
}
