using AutoMapper;
using GoOut.Core.Commands.Event;
using GoOut.Core.Commands.Users;
using GoOut.Core.DTO;
using GoOut.Core.Queries.Users;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoOut.API.Controllers
{
    public class UserController : BaseApiController
    {


        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] NewUserDTO userDto)
        {

            var result = await Mediator.Send(new CreateUserCommand { newUser = userDto });
            return Ok(result);
        }
        [HttpGet("{email}")]
        public async Task<ActionResult<UserDTO>> GetByEmail(string email)
        {
            var result = await Mediator.Send(new GetByEmailQuery { Email = email });
            return result;
        }
        [HttpDelete("{userid}")]
        public async Task<IActionResult> DeleteUser(Guid userid)
        {
            var res = await Mediator.Send(new DeleteUserCommand { Id = userid });
            return Ok(res);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDTO userDto)
        {
            var res = await Mediator.Send(new UpdateUserCommand { UserDto = userDto });
            return Ok(res);
        }
        [HttpPut("{userid}/{eventid}")]
        public async Task<IActionResult> AddToLiked(Guid userid, Guid eventid)
        {
            var res = await Mediator.Send(new AddEventToUserCommand
            {
                UserId = userid,
                EventId=eventid
            });
            return Ok(res);
        }
        [HttpPut("deletelike/{userid}/{eventid}")]
        public async Task<IActionResult> DelteFromLiked(Guid userid, Guid eventid)
        {
            var res = await Mediator.Send(new DeleteEventFromUserCommand
            {
                UserId = userid,
                EventId = eventid
            });
            return Ok(res);
        }

    }
}
