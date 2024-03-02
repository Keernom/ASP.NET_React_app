using ASP.NET_React_app.Data;
using ASP.NET_React_app.Data.Entities;
using ASP.NET_React_app.Models;
using ASP.NET_React_app.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
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
        public async Task<ActionResult<UserProfile>> GetAccount() 
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null)
            {
                return BadRequest();
            }

            var profile = _userService.ToProfile(currentUser);

            return Ok(profile);
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> CreateAccount(UserModel userModel) 
        { 
            var newUser = await _userService.CreateAsync(userModel);
            return Ok(newUser);
        }

        [HttpPatch]
        [Authorize]
        public async Task<ActionResult<UserModel>> UpdateAccount(UserModel userModel)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);

            if (currentUser == null && currentUser?.Id != userModel.Id) 
            {
                return BadRequest();
            }

            await _userService.UpdateAsync(currentUser, userModel);

            return Ok(userModel);
        }

        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> DeleteAccount(int userId)
        {
            var currentUserEmail = HttpContext.User.Identity.Name;
            User currentUser = await _userService.GetUserByLogin(currentUserEmail);
            await _userService.DeleteAsync(currentUser);

            return Ok();
        }

        [HttpPost("token")]
        public async Task<ActionResult<AuthToken>> GetToken()
        {
            (string login, string password) userData = _userService.GetUserLoginPassFromBasicAuth(Request);

            (ClaimsIdentity claims, int id)? identity = await _userService.GetIdentity(userData.login, userData.password);

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
