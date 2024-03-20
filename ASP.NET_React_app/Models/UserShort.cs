namespace ASP.NET_React_app.Models
{
    public class UserShort
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public object? Photo { get; set; }
        public bool isInSubs { get; set; }
    }
}
