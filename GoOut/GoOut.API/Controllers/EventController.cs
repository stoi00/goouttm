using GoOut.Core.Commands.Event;
using GoOut.Core.Commands.Events;
using GoOut.Core.DTO;
using GoOut.Core.Queries.Events;
using Microsoft.AspNetCore.Mvc;

namespace GoOut.API.Controllers
{
    public class EventController:BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] NewEventDTO eventDto)
        {

            var result = await Mediator.Send(new CreateEventCommand { NewEventDto = eventDto });
            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult<List<EventDTO>>> GetAllEvents()
        { 
            var res = await Mediator.Send(new GetAllEventsQuery { });
            return res;
        }
        [HttpDelete("{eventid}")]
        public async Task<IActionResult> DeleteEvent(Guid eventid)
        {
            var res= await Mediator.Send(new DeleteEventCommand { Id= eventid });
            return Ok(res);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateEvent([FromBody] EventDTO eventDto)
        {
            var res=await Mediator.Send(new UpdateEventCommand {EventDTO= eventDto});
            return Ok(res);
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<EventDTO>> GetById(Guid Id)
        {
            var res=await Mediator.Send(new GetEventByIdQuery { Id= Id });
            return res;
        }
    }
}
