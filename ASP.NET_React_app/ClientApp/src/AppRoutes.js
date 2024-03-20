import Home from "./components/Home/Home";
import { PostsForUser } from "./components/posts/Post";
import Login from "./components/users/Login/Login";
import SearchUser from "./components/users/SearchUser/SearchUser";
import SignUp from "./components/users/SignUp/SignUp";
import UserProfile from "./components/users/UserProfile/UserProfile";
import UserPublicView from "./components/users/UserPublicView";
import { LOGIN_URL, PROFILE_URL, SIGNUP_URL, SEARCH_URL, ALLPOSTS_URL } from "./services/commonService";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: LOGIN_URL,
    element: <Login />
  },
  {
    path: PROFILE_URL,
    element: <UserProfile />
  },
  {
    path: SIGNUP_URL,
    element: <SignUp />
  },
  {
    path: `${SEARCH_URL}/:userId`,
    element: <UserPublicView />
  },
  {
    path: SEARCH_URL,
    element: <SearchUser />
  },
  {
    path: ALLPOSTS_URL,
    element: <PostsForUser />
  }
];

export default AppRoutes;
