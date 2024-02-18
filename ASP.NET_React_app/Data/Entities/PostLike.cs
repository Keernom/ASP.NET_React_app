namespace ASP.NET_React_app.Data.Entities
{
    public class PostLike
    {
        public int PostId { get; set; }
        public List<int> UsersId { get; set; }
    }
}
