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
    public class PostsController : Controller
    {
        private PostsService _postService;
        private UserService _userService;

        public PostsController(PostsService postService, UserService userService)
        {
            _postService = postService;
            _userService = userService;
        }

        [HttpGet("{userId}")]
        public ActionResult<List<PostView>> GetByAuthor(int userId)
        {
            List<PostView> posts = _postService.GetByAuthor(userId);
            return Ok(posts);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            var posts = await _postService.GetPostsForCurrentUser(currentUser.Id);
            return Ok(posts);
        }

        [HttpPost] 
        public async Task<ActionResult<PostModel>> Create([FromBody] PostModel postModel)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            var postM = await _postService.CreateAsync(postModel, currentUser.Id);
            return Ok(postM);
        }

        [HttpPatch]
        public async Task<ActionResult<PostModel>> Update([FromBody] PostModel postModel)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            var postM = await _postService.UpdateAsync(postModel, currentUser.Id);
            return Ok(postM);
        }

        [HttpDelete("{postId}")]
        public async Task<ActionResult<PostModel>> Delete(int postId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            await _postService.DeleteAsync(postId, currentUser.Id);
            return Ok();
        }

        [HttpPost("like/{postId}")]
        public async Task<IActionResult> SetLike(int postId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            _postService.SetLike(postId, currentUser.Id);

            return Ok();
        }


        [HttpPost("create")]
        public async Task<IActionResult> CreatePosts([FromBody] List<PostModel> postModels)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return NotFound();
            }

            var postM = await _postService.CreateFromListAsync(postModels, currentUser.Id);
            return Ok(postM);
        }
    }
}
