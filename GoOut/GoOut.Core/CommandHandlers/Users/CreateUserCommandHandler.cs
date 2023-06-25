using AutoMapper;
using GoOut.Core.Commands.Users;
using GoOut.Core.DTO;
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
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CreateUserCommandHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var mappedres = _mapper.Map<User>(request.newUser);
            try
            {
                var eve = await _unitOfWork.UserRepository.GetByEmail(mappedres.Email);
            }
            catch (Exception ex) { 
                //var mappedres = _mapper.Map<User>(request.newUser);
                mappedres.Id = new Guid();
                mappedres.CreatedEvents = new List<Event>();
                mappedres.LikedEvents = new List<Event>();
                _unitOfWork.UserRepository.Add(mappedres);
                await _unitOfWork.SaveChangesAsync();
                return Unit.Value;
            }
            throw new NotImplementedException("This email already exist!");
            return Unit.Value;
        }
    }

}
