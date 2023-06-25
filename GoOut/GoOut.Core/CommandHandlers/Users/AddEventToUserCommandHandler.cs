using AutoMapper;
using GoOut.Core.Commands.Users;
using GoOut.Core.Interfaces;
using GoOut.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.CommandHandlers.Users
{
    public class AddEventToUserCommandHandler:IRequestHandler<AddEventToUserCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AddEventToUserCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(AddEventToUserCommand request, CancellationToken cancellationToken)
        {
            var us=await _unitOfWork.UserRepository.GetUser(request.UserId);
            var eve=await _unitOfWork.EventRepository.GetEvent(request.EventId);
            if(us.LikedEvents==null) {
                us.LikedEvents = new List<Event>();
            }
            us.LikedEvents.Add(eve);
            _unitOfWork.UserRepository.UpdateUser(us);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
