using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ASP.NET_React_app.Models
{
    public class AuthOptions
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "MyAuthClient";
        const string KEY = "j4hR6QddW/7a2fK6XZ55bHapSRlrMnklu+nn0m4isJA=";
        public const int LIFETIME = 10;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
