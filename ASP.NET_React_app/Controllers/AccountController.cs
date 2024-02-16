using ASP.NET_React_app.Models;
using ASP.NET_React_app.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ASP.NET_React_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private UserService _userService;

        public AccountController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAccount() 
        { 
            throw new NotImplementedException();
        }

        [HttpPost]
        public ActionResult<UserModel> CreateAccount(UserModel user) 
        { 
            return Ok(user);
        }

        [HttpPatch]
        public ActionResult<UserModel> UpdateAccount(UserModel user)
        {
            return Ok(user);
        }

        [HttpDelete]
        public IActionResult DeleteAccount(int userId)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public ActionResult<AuthToken> GetToken()
        {
            (string login, string password) userData = _userService.GetUserLoginPassFromBasicAuth(Request);

            (ClaimsIdentity claims, int id)? identity = _userService.GetIdentity(userData.login, userData.password);

            if (identity == null) return NotFound("Login or password is not correct");

            DateTime now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity?.claims.Claims,
                expires: now.AddMinutes(AuthOptions.LIFETIME),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        
            string encodedJWT = new JwtSecurityTokenHandler().WriteToken(jwt);

            AuthToken token = new AuthToken(
                minutes: AuthOptions.LIFETIME,
                accessToken: encodedJWT,
                userName: userData.login,
                userId: identity.Value.id);

            return Ok(token);
        }
    }
}
