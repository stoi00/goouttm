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
    public class DeleteEventFromUserCommandHandler:IRequestHandler<DeleteEventFromUserCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DeleteEventFromUserCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(DeleteEventFromUserCommand request, CancellationToken cancellationToken)
        {
            var us = await _unitOfWork.UserRepository.GetUserWithLiked(request.UserId);
            var eve = await _unitOfWork.EventRepository.GetEvent(request.EventId);
            if (us.LikedEvents != null)
            {
                foreach (var e in us.LikedEvents)
                {
                    if (e.Id == eve.Id)
                    {
                        us.LikedEvents.Remove(e);
                    }
                }
            }
            _unitOfWork.UserRepository.UpdateUser(us);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
