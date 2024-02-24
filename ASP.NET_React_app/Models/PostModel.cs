namespace ASP.NET_React_app.Models
{
    public class PostModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public byte[]? Image { get; set; }
        
        public int? LikesCount { get; set; }
        public DateTime? PostDate { get; set; }

        public PostModel()
        {
            
        }

        public PostModel(int id, string text, byte[] image, DateTime date)
        {
            Id = id;
            Text = text;
            Image = image;
            PostDate = date;
        }
    }
}
