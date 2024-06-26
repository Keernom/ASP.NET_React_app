﻿using ASP.NET_React_app.Data.Entities;
using ASP.NET_React_app.Models;
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
        public async Task<IActionResult> GetUsersByName(string name)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            return Ok(_userService.GetUsersByName(name, currentUser));
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

            if (currentUser.Id != userId) _userService.Subscribe(currentUser.Id, userId);
            else return BadRequest();
            
            return Ok();
        }

        [HttpPost("unsubs/{userId}")]
        public async Task<IActionResult> UnSubcribe(int userId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            if (currentUser.Id != userId) _userService.UnSubscribe(currentUser.Id, userId);
            else return BadRequest();

            return Ok();
        }

        [HttpPost("issubs/{userId}")]
        public async Task<IActionResult> IsSubscribed(int userId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            bool res = false;
            if (currentUser.Id != userId)
            {
                res = _userService.IsSubscribed(currentUser.Id, userId);
            }
            else return BadRequest();

            return Ok(res);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            return Ok(await _userService.GetUserProfileById(currentUser, userId));
        }

        // Эндпоинт для массового создания пользователей
        [HttpPost("create")]
        public async Task<IActionResult> CreateUsers([FromBody] List<UserModel> users)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            if (currentUser.Id != 1) return BadRequest();

            var newUsers = await _userService.CreateFromListAsync(users);
            return Ok(newUsers);
        }
    }
}
