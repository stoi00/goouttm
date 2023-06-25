using AutoMapper;
using GoOut.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.DTO.Profiles
{
    public class UserProfile:Profile
    {
        public UserProfile()
        {
            CreateMap<User, NewUserDTO>();
            CreateMap<NewUserDTO, User>();
            CreateMap<UserDTO, User>();
            CreateMap<User, UserDTO>();
            CreateMap<UpdateUserDTO, User>();
            CreateMap<User, UpdateUserDTO>();
        }
    }
}
