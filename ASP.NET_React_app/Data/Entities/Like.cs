namespace ASP.NET_React_app.Data.Entities
{
    public class Like
    {
        public int Id { get; set; }
        public int From { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
