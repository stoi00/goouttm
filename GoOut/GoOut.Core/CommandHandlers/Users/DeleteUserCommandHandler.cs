using AutoMapper;
using GoOut.Core.Commands.Event;
using GoOut.Core.Commands.Users;
using GoOut.Core.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.CommandHandlers.Users
{
    public class DeleteUserCommandHandler:IRequestHandler<DeleteUserCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DeleteUserCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var mappedres = await _unitOfWork.UserRepository.GetUser(request.Id);

            _unitOfWork.UserRepository.Delete(mappedres);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
