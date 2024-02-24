using ASP.NET_React_app.Data.Entities;
using ASP.NET_React_app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET_React_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : Controller
    {
        private UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("all/{name}")]
        public IActionResult GetUsersByName(string name)
        {
            return Ok(_userService.GetUsersByName(name));
        }

        [HttpPost("subs/{userId}")]
        public async Task<IActionResult> Subscribe(int userId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            if (currentUser.Id !=  userId) _userService.Subscribe(currentUser.Id, userId);
            else return BadRequest();
            
            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            return Ok(await _userService.GetUserProfileById(userId));
        }
    }
}
