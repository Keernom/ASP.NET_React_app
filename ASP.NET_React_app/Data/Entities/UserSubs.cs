namespace ASP.NET_React_app.Data.Entities
{
    public class UserSubs
    {
        public int Id { get; set; }
        public List<UserSub> Users { get; set; }
    }

    public class UserSub
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
    }
}
