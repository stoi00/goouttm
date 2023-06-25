using GoOut.Core.DTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.Queries.Events
{
    public class GetEventByIdQuery:IRequest<EventDTO>
    {
        public Guid Id { get; set; }
    }
}
