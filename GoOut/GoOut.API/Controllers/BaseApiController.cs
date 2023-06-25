using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace GoOut.API.Controllers
{

        [ApiController]
        [Route("api/[controller]")]
        public class BaseApiController : ControllerBase
        {
            private IMediator _mediator;
            private IMapper _mapper;
            protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
            protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();
        }
    
}
