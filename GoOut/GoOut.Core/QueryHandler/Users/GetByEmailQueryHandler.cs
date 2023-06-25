using AutoMapper;
using GoOut.Core.DTO;
using GoOut.Core.Interfaces;
using GoOut.Core.Queries.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.QueryHandler.Users
{
    public class GetByEmailQueryHandler:IRequestHandler<GetByEmailQuery,UserDTO>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public GetByEmailQueryHandler(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<UserDTO> Handle(GetByEmailQuery request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.UserRepository.GetByEmail(request.Email);
            var user= _mapper.Map<UserDTO>(result);
            return user;
        }
    }
}
