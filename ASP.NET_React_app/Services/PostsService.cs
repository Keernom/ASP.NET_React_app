using ASP.NET_React_app.Data;
using ASP.NET_React_app.Data.Entities;
using ASP.NET_React_app.Models;
using System.Collections;

namespace ASP.NET_React_app.Services
{
    public class PostsService
    {
        private AppDbContext _dbContext;
        private NoSQLDataService _noSQLDataService;

        public PostsService(AppDbContext dbContext, NoSQLDataService noSQLDataService)
        {
            _dbContext = dbContext;
            _noSQLDataService = noSQLDataService;
        }

        public List<PostModel> GetByAuthor(int userId)
        {
            var posts = _dbContext.Posts.Where(p => p.UserId == userId)
                .OrderBy(p => p.PostDate)
                .Reverse()
                .Select(ToModel)
                .ToList();
            return posts;
        }

        public async Task<PostModel> CreateAsync(PostModel postModel, int userId)
        {
            Post post = new Post()
            {
                UserId = userId,
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

        public async Task<List<PostModel>> CreateFromListAsync(List<PostModel> postModels, int userId)
        {
            foreach(var postModel in postModels)
            {
                Post post = new Post()
                {
                    UserId = userId,
                    Text = postModel.Text,
                    Image = postModel.Image,
                    PostDate = DateTime.UtcNow,
                };

                _dbContext.Posts.Add(post);
            }

            await _dbContext.SaveChangesAsync();

            return postModels;
        }

        public async Task<PostModel> UpdateAsync(PostModel postModel, int userId)
        {
            Post postToUpdate = _dbContext.Posts
                .FirstOrDefault(p => p.Id == postModel.Id && p.UserId == userId);

            if (postToUpdate == null)
            {
                return null;
            }

            postToUpdate.Text = postModel.Text;
            postToUpdate.Image = postModel.Image;

            _dbContext.Posts.Update(postToUpdate);
            await _dbContext.SaveChangesAsync();

            postModel = ToModel(postToUpdate);

            return postModel;
        }

        public async Task DeleteAsync(int postId, int userId)
        {
            Post postToDelete = _dbContext.Posts
                .FirstOrDefault(p => p.Id == postId && p.UserId == userId);

            if (postToDelete == null)
            {
                return;
            }

            _dbContext.Posts.Remove(postToDelete);
            await _dbContext.SaveChangesAsync();
        }

        public List<PostModel> GetPostsForCurrentUser(int userId)
        {
            var subs = _noSQLDataService.GetUserSubs(userId);

            var allPosts = new List<PostModel>();

            if (subs == null) return allPosts;

            foreach (var sub in subs.Users)
            {
                var allPostsByAuthor = _dbContext.Posts.Where(p => p.UserId == sub.Id);
                allPosts.AddRange(allPostsByAuthor.Select(ToModel));
            }

            allPosts.Sort(new PostComparer());

            return allPosts;
        }

        public void SetLike(int postId, int userId)
        {
            _noSQLDataService.SetPostLike(userId, postId);
        }

        private PostModel ToModel(Post post)
        {
            var likes = _noSQLDataService.GetPostLike(post.Id);

            PostModel postModel = new PostModel(post.Id, post.Text, post.Image, post.PostDate);
            postModel.LikesCount = likes == null ? 0 : likes.UsersId.Count;
            return postModel;
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
