using AutoMapper;
using GoOut.Core.Commands.Event;
using GoOut.Core.Commands.Events;
using GoOut.Core.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.CommandHandlers.Events
{
    public class UpdateEventCommandHandler:IRequestHandler<UpdateEventCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UpdateEventCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var eve = await _unitOfWork.EventRepository.GetEvent(request.EventDTO.Id);
            eve.Photo = request.EventDTO.Photo;
            eve.EntryFee = request.EventDTO.EntryFee;
            eve.Category = request.EventDTO.Category;
            eve.Date_Time = request.EventDTO.Date_Time;
            eve.Description = request.EventDTO.Description;
            eve.Location = request.EventDTO.Location;
            eve.Name = request.EventDTO.Name;
            var update=_unitOfWork.EventRepository.UpdateEvent(eve);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
