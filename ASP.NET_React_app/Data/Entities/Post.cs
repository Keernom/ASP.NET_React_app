namespace ASP.NET_React_app.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public byte[] Image { get; set; }
        public int AuthorId { get; set; }
        public DateTime PostDate { get; set; }
        public User User { get; set; }
    }
}
