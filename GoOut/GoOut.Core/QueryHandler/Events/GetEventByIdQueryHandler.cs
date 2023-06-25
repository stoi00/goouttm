using AutoMapper;
using GoOut.Core.DTO;
using GoOut.Core.Interfaces;
using GoOut.Core.Queries.Events;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.QueryHandler.Events
{
    public class GetEventByIdQueryHandler : IRequestHandler<GetEventByIdQuery,EventDTO>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetEventByIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<EventDTO> Handle(GetEventByIdQuery request, CancellationToken cancellationToken)
        {
            var res = await _unitOfWork.EventRepository.GetEvent(request.Id);
            var med=_mapper.Map<EventDTO>(res);
            return med;
        }
    }
}
