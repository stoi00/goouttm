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
    public class UpdateUserCommandHandler:IRequestHandler<UpdateUserCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UpdateUserCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var eve = await _unitOfWork.UserRepository.GetUser(request.UserDto.Id);
            eve.Surname = request.UserDto.Surname;
            eve.Name = request.UserDto.Name;
            eve.Password = request.UserDto.Password;
            eve.Photo = request.UserDto.Photo;
            eve.Age = request.UserDto.Age;
            eve.Email = request.UserDto.Email;
            var update = _unitOfWork.UserRepository.UpdateUser(eve);
            await _unitOfWork.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
