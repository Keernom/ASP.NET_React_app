namespace ASP.NET_React_app.Models
{
    public class PostView
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public object? Image { get; set; }
        
        public int? LikesCount { get; set; }
        public DateTime? PostDate { get; set; }

        public PostView()
        {
            
        }

        public PostView(int id, string text, byte[] image, DateTime date)
        {
            Id = id;
            Text = text;
            Image = image;
            PostDate = date;
        }
    }
}
