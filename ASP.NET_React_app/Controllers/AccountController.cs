using Microsoft.AspNetCore.Mvc;

namespace ASP.NET_React_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult GetAccount() 
        { 
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult CreateAccount() 
        { 
            throw new NotImplementedException(); 
        }

        [HttpPost]
        public IActionResult GetToken()
        {
            throw new NotImplementedException();
        }

        [HttpPatch]
        public IActionResult UpdateAccount()
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult DeleteAccount(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
