using AutoMapper;
using GoOut.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.DTO.Profiles
{
     public class EventProfile:Profile
    {
        public EventProfile() {
            CreateMap<Event, NewEventDTO>();
            CreateMap<NewEventDTO, Event>();
            CreateMap<Event, EventDTO>();
            CreateMap<EventDTO, Event>();
        }
    }
}
