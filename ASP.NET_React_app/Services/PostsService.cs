using ASP.NET_React_app.Data;
using ASP.NET_React_app.Data.Entities;
using ASP.NET_React_app.Models;
using System.Collections;

namespace ASP.NET_React_app.Services
{
    public class PostsService
    {
        private AppDbContext _dbContext;

        public PostsService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<PostModel> GetByAuthor(int userId)
        {
            var posts = _dbContext.Posts.Where(p => p.AuthorId == userId)
                .Reverse()
                .Select(ToModel)
                .ToList();
            return posts;
        }

        public async Task<PostModel> CreateAsync(PostModel postModel, int userId)
        {
            Post post = new Post()
            {
                AuthorId = userId,
                Text = postModel.Text,
                Image = postModel.Image,
                PostDate = DateTime.UtcNow,
            };

            _dbContext.Posts.Add(post);
            await _dbContext.SaveChangesAsync();

            postModel.Id = post.Id;
            postModel.PostDate = post.PostDate;

            return postModel;
        }

        public async Task<PostModel> UpdateAsync(PostModel postModel, int userId)
        {
            Post postToUpdate = _dbContext.Posts
                .FirstOrDefault(p => p.Id == postModel.Id && p.AuthorId == userId);

            if (postToUpdate == null)
            {
                return null;
            }

            postToUpdate.Text = postModel.Text;
            postToUpdate.Image = postModel.Image;

            _dbContext.Posts.Update(postToUpdate);
            await _dbContext.SaveChangesAsync();

            return postModel;
        }

        public async Task DeleteAsync(int postId, int userId)
        {
            Post postToDelete = _dbContext.Posts
                .FirstOrDefault(p => p.Id == postId && p.AuthorId == userId);

            if (postToDelete == null)
            {
                return;
            }

            _dbContext.Posts.Remove(postToDelete);
            await _dbContext.SaveChangesAsync();
        }

        public List<PostModel> GetPostsForCurrentUser(int userId)
        {
            var subs = _dbContext.UserSubs.Where(s => s.From == userId).ToList();

            var allPosts = new List<PostModel>();

            foreach (var sub in subs)
            {
                var allPostsByAuthor = _dbContext.Posts.Where(p => p.AuthorId == sub.To);
                allPosts.AddRange(allPostsByAuthor.Select(ToModel));
            }

            allPosts.Sort(new PostComparer());

            return allPosts;
        }

        private PostModel ToModel(Post post)
        {
            var likes = _dbContext.Likes.Where(l => l.PostId == post.Id).Count();

            PostModel postModel = new PostModel(post.Id, post.Text, post.Image, post.PostDate);
            postModel.LikesCount = likes;
            return postModel;
        }

        public async Task SetLike(int userId, int postId)
        {
            var like = new Like()
            {
                From = userId, 
                PostId = postId
            };

            _dbContext.Likes.Add(like);
            await _dbContext.SaveChangesAsync();    
        }
    }

    class PostComparer : IComparer<PostModel>
    {
        public int Compare(PostModel? x, PostModel? y)
        {
            if (x.PostDate > y.PostDate) return -1;
            if (x.PostDate < y.PostDate) return 1;
            return 0;
        }
    }
}
