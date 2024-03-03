import { ACCOUNT_URL, LOGIN_URL, POSTS_URL, PROFILE_URL, USERS_URL, sendRequestWithToken } from "./commonService";


export async function getPostsByUserId(userId) {
    const allPosts = await sendRequestWithToken(`${POSTS_URL}/${userId}`, 'GET')
    return allPosts;
}