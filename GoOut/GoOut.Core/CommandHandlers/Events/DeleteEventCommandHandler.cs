using AutoMapper;
using GoOut.Core.Commands.Event;
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
    public class DeleteEventCommandHandler:IRequestHandler<DeleteEventCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DeleteEventCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
        {
            var mappedres = await _unitOfWork.EventRepository.GetEvent(request.Id);

            _unitOfWork.EventRepository.Delete(mappedres);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
