namespace ASP.NET_React_app.Models
{
    public class PostModel
    {
        public int Id { get; set; }
        public string Text { get; private set; }
        public byte[] Image { get; private set; }
        public int LikesCount { get; set; }
        public DateTime PostDate { get; set; }

        public PostModel(int id, string text, byte[] image, DateTime date)
        {
            Id = id;
            Text = text;
            Image = image;
            PostDate = date;
        }
    }
}
