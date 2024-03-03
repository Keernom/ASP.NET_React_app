import { post } from "jquery";
import { ACCOUNT_URL, LOGIN_URL, POSTS_URL, PROFILE_URL, USERS_URL, sendRequestWithToken } from "./commonService";


export async function getPostsByUserId(userId) {
    const allPosts = await sendRequestWithToken(`${POSTS_URL}/${userId}`, 'GET')
    return allPosts;
}

export async function createPost(post) {
    post.image = post.image.toString();
    const res = await sendRequestWithToken(POSTS_URL, 'POST', post)
    return res;
}

export async function updatePost(post) {
    post.image = post.image.toString();
    const res = await sendRequestWithToken(POSTS_URL, 'PATCH', post)
    return res;
}

export async function deletePost(postId) {
    const res = await sendRequestWithToken(`${POSTS_URL}/${postId}`, 'DELETE')
    return res;
}