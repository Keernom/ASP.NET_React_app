using ASP.NET_React_app.Data.Entities;
using LiteDB;

namespace ASP.NET_React_app.Services
{
    public class NoSQLDataService
    {
        private readonly string DBPath = "MyData.db";
        private const string SubsCollection = "SubsCollection";
        private const string PostLikeCollection = "PostLikeCollection";

        public UserSubs GetUserSubs(int userId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == userId);
                return subsForUser;
            }
        }

        public UserSubs SetUserSubs(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == from);
                var sub = new UserSub { Id = to, Date = DateTime.UtcNow };

                if (subsForUser != null)
                {
                    if (!subsForUser.Users.Select(x => x.Id).Contains(to))
                    {
                        subsForUser.Users.Add(sub);
                        subs.Update(subsForUser);
                    }
                }
                else
                {
                    var newSubsForUser = new UserSubs() 
                    { 
                        Id = from, 
                        Users = new List<UserSub>() { sub } 
                    };

                    subs.Insert(newSubsForUser);
                    subs.EnsureIndex(x => x.Id);

                    subsForUser = newSubsForUser;
                }

                return subsForUser;
            }
        }

        public void RemoveSubcription(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == from);

                if (subsForUser != null)
                {
                    if (subsForUser.Users.Select(x => x.Id).Contains(to))
                    {
                        var subscription = subsForUser.Users.FirstOrDefault(x => x.Id == to);
                        subsForUser.Users.Remove(subscription);
                        
                        subs.Update(subsForUser);
                    }
                }
                else
                {
                    return;
                }
            }
        }

        public bool IsSubscribed(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);

                var subsForUser = subs.FindOne(x => x.Id == from);

                if (subsForUser != null)
                {
                    return subsForUser.Users.Select(x => x.Id).Contains(to);
                }
                else
                {
                    return false;
                }
            }
        }

        public PostLike GetPostLike(int postId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<PostLike>(PostLikeCollection);
                var postLikes = likes.FindOne(x => x.PostId == postId);

                return postLikes;
            }
        }

        public PostLike SetPostLike(int from, int postId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<PostLike>(PostLikeCollection);

                var postLikes = likes.FindOne(x => x.PostId == postId);

                if (postLikes != null)
                {
                    if (!postLikes.UsersId.Contains(from))
                    {
                        postLikes.UsersId.Add(from);
                        likes.Update(postLikes);
                    }
                }
                else
                {
                    var newPostLikes = new PostLike()
                    {
                        PostId = postId,
                        UsersId = new List<int>() { from }
                    };

                    likes.Insert(newPostLikes);
                    likes.EnsureIndex(x => x.PostId);

                    postLikes = newPostLikes;
                }

                return postLikes;
            }
        }
    }
}
