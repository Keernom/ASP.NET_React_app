namespace ASP.NET_React_app.Models
{
    public class PostModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string? Image { get; set; }
        
        public int? LikesCount { get; set; }
        public DateTime? PostDate { get; set; }

        public PostModel()
        {
            
        }
    }
}
