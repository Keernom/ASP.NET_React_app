using ASP.NET_React_app.Data;
using System.Security.Claims;
using System.Text;

namespace ASP.NET_React_app.Services
{
    public class UserService
    {
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

        public (ClaimsIdentity identity, int id)? GetIdentity(string email, string password)
        {
            User? currentUser = GetUserByLogin(email);

            if (currentUser == null || !VerifyHashedPassword(currentUser.Password, password)) return null; 

            var claims = new List<Claim>() 
            { 
                new Claim(ClaimsIdentity.DefaultNameClaimType, currentUser.Email)
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(
                claims,
                "Token",
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return (claimsIdentity, currentUser.Id);
        }

        private User? GetUserByLogin(string email)
        {
            throw new NotImplementedException();
        }

        private bool VerifyHashedPassword(string password1, string password2)
        {
            return password1 == password2;
        }
    }
}
