using AutoMapper;
using GoOut.Core.Commands.Events;
using GoOut.Core.Interfaces;
using GoOut.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.CommandHandlers.Events
{
    public class CreateEventCommandHandler:IRequestHandler<CreateEventCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CreateEventCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var mappedres = _mapper.Map<Event>(request.NewEventDto);
            mappedres.Id = new Guid();
            mappedres.LikedUsers = new List<User>();
            _unitOfWork.EventRepository.Add(mappedres);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
