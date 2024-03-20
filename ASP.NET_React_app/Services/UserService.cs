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
                Photo = ImageService.GetPhoto(user.Photo),
            };

            _dbContext.Add(newUser);
            await _dbContext.SaveChangesAsync();

            user.Id = newUser.Id;

            return user;
        }

        public async Task<List<UserModel>> CreateFromListAsync(List<UserModel> users)
        {
            foreach(var user in users)
            {
                var newUser = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    Password = user.Password,
                    Description = user.Description,
                    Photo = ImageService.GetPhoto(user.Photo),
                };

                _dbContext.Add(newUser);
            }
            
            await _dbContext.SaveChangesAsync();

            return users;
        }

        public async Task<UserModel> UpdateAsync(User userToUpdate, UserModel user)
        {
            userToUpdate.Name = user.Name;
            userToUpdate.Email = user.Email;
            userToUpdate.Password = user.Password;
            userToUpdate.Description = user.Description;

            if (!string.IsNullOrEmpty(user.Photo))
            {
                userToUpdate.Photo = ImageService.GetPhoto(user.Photo);
            }

            _dbContext.Users.Update(userToUpdate);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User?> GetUserByLogin(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserProfile?> GetUserProfileById(User currentuser, int id)
        {
            User? user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return null;
            }


            UserProfile userProfile = ToProfile(user);
            userProfile.IsInSubs = _noSQLDataService.IsSubscribed(currentuser.Id, id);
            return userProfile;
        }

        public List<UserShort> GetUsersByName(string name, User currentUser)
        {
            string lowerName = name.ToLower();
            List<UserShort> users = _dbContext.Users
                .Where(x => x.Name.ToLower().StartsWith(lowerName) && x.Id != currentUser.Id)
                .Select(ToShortModel)
                .ToList();

            foreach(var user in users)
            {
                user.isInSubs = _noSQLDataService.IsSubscribed(currentUser.Id, user.Id);
            }

            return users;
        }

        public async Task DeleteAsync(User user)
        {
            _dbContext.Remove(user);
            _dbContext.SaveChangesAsync();
        }

        public void Subscribe(int from, int to)
        {
            var userSubs = _noSQLDataService.GetUserSubs(from);

            if (userSubs != null)
            {
                if (userSubs.Users.Select(u => u.Id).Contains(to))
                {
                    return;
                }
            }

            _noSQLDataService.SetUserSubs(from, to);
        }

        public void UnSubscribe(int from, int to)
        {
            _noSQLDataService.RemoveSubcription(from, to);
        }

        public bool IsSubscribed(int from, int to)
        {
            return _noSQLDataService.IsSubscribed(from, to);
        }

        public (string login, string password) GetUserLoginPassFromBasicAuth(HttpRequest request)
        {
            string userName = "";
            string userPass = "";
            string authHeader = request.Headers.Authorization.ToString();

            if (authHeader != null && authHeader.StartsWith("Basic"))
            {
                string encodedUsernamePass = authHeader.Replace("Basic ", "");
                var encoding = Encoding.GetEncoding("iso-8859-1");

                byte[] bytes = Convert.FromBase64String(encodedUsernamePass);
                string[] namePassArray = encoding.GetString(bytes).Split(':');
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

        public UserProfile ToProfile(User user)
        {
            var userSubs = _noSQLDataService.GetUserSubs(user.Id);
            return new UserProfile()
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Description = user.Description,
                Photo = user.Photo,
                SubsCount = userSubs?.Users.Count ?? 0
            };
        }

        private UserShort ToShortModel(User user)
        {
            return new UserShort()
            {
                Id = user.Id,
                Name = user.Name,
                Description = new string(user.Description.Take(50).ToArray()),
                Photo = user.Photo
            };
        }
    }
}
