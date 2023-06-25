using AutoMapper;
using GoOut.Core.DTO;
using GoOut.Core.Interfaces;
using GoOut.Core.Queries.Events;
using GoOut.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.QueryHandler.Events
{
    public class GetAllEventsQueryHandler :IRequestHandler<GetAllEventsQuery, List<EventDTO>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetAllEventsQueryHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<List<EventDTO>> Handle(GetAllEventsQuery request, CancellationToken cancellationToken)
        {
            List<EventDTO> eve= new List<EventDTO>();
            var result = await _unitOfWork.EventRepository.GetAll();
            foreach (var user in result)
            {
                eve.Add(_mapper.Map<EventDTO>(user));
            }
            return eve;
        }
    }
}
