using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.Commands.Event
{
        public class DeleteEventCommand : IRequest
        {
            public Guid Id { get; set; }
        }

}
