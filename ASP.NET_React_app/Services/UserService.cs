using ASP.NET_React_app.Data;
using ASP.NET_React_app.Data.Entities;
using ASP.NET_React_app.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;

namespace ASP.NET_React_app.Services
{
    public class UserService
    {
        private AppDbContext _dbContext;
        private NoSQLDataService _noSQLDataService;

        public UserService(AppDbContext dbContext, NoSQLDataService noSQLDataService)
        {
            _dbContext = dbContext;
            _noSQLDataService = noSQLDataService;

        }

        public async Task<UserModel> CreateAsync(UserModel user)
        {
            var newUser = new User()
            {
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Description = user.Description,
                Photo = user.Photo,
            };

            _dbContext.Add(newUser);
            await _dbContext.SaveChangesAsync();

            user.Id = newUser.Id;

            return user;
        }

        public async Task<UserModel> UpdateAsync(User userToUpdate, UserModel user)
        {
            userToUpdate.Name = user.Name;
            userToUpdate.Email = user.Email;
            userToUpdate.Password = user.Password;
            userToUpdate.Description = user.Description;
            userToUpdate.Photo = user.Photo;

            _dbContext.Users.Update(userToUpdate);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User?> GetUserByLogin(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task DeleteAsync(User user)
        {
            _dbContext.Remove(user);
            _dbContext.SaveChangesAsync();
        }

        public void Subscribe(int from, int to)
        {
            _noSQLDataService.SetUserSubs(from, to);
        }

        public (string login, string password) GetUserLoginPassFromBasicAuth(HttpRequest request)
        {
            string userName = "";
            string userPass = "";
            string authHeader = request.Headers.Authorization.ToString();

            if (authHeader != null && authHeader.StartsWith("Basic"))
            {
                string encodedUsernamePass = authHeader.Replace("Basic", "");
                var encoding = Encoding.GetEncoding("iso-8859-1");

                string[] namePassArray = encoding.GetString(Convert.FromBase64String(encodedUsernamePass)).Split(':');
                userName = namePassArray[0];
                userPass = namePassArray[1];
            }

            return (userName, userPass);
        }

        public async Task<(ClaimsIdentity identity, int id)?> GetIdentity(string email, string password)
        {
            User? currentUser = await GetUserByLogin(email);

            if (currentUser == null || !VerifyHashedPassword(currentUser.Password, password)) return null; 

            var claims = new List<Claim>() 
            { 
                new Claim(ClaimsIdentity.DefaultNameClaimType, currentUser.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "User")
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return (claimsIdentity, currentUser.Id);
        }

        private bool VerifyHashedPassword(string password1, string password2)
        {
            return password1 == password2;
        }
    }
}
