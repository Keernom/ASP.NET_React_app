﻿using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace ASP.NET_React_app.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
    }
}
