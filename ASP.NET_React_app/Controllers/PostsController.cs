using ASP.NET_React_app.Data.Entities;
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

        public PostsController(PostsService postService)
        {
            _postService = postService;
        }

        [HttpGet("{userId}")]
        public ActionResult<List<Post>> GetByAuthor(int userId)
        {
            List<Post> posts = _postService.GetByAuthor(userId);
            return Ok(posts);
        }

        [HttpPost] 
        public IActionResult Create([FromBody] PostModel postModel)
        {

        }
    }
}
