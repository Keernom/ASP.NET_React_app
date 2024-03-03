import { ACCOUNT_URL, LOGIN_URL, PROFILE_URL, USERS_URL, clearStorage, sendRequestWithToken } from "./commonService";


export async function getUser() {
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

export async function getPublicUser(userId) {
    var user = await sendRequestWithToken(`${USERS_URL}/${userId}`, 'GET');
    return user;
}

export async function updateUserAsync(user) {
    user.photo = user.photo.toString();
    var user = await sendRequestWithToken(ACCOUNT_URL, 'PATCH', user);
    window.location.href = PROFILE_URL;
    return user;
}

export async function createUserAsync(user) {
    user.photo = user.photo.toString();
    var user = await sendRequestWithToken(ACCOUNT_URL, 'POST', user, false);
    window.location.href = LOGIN_URL;
    return user;
}

export function exitFromPorfile() {
    const userAnswer = window.confirm('Are you sure?');
    if (userAnswer) {
        clearStorage();
        window.location.href = LOGIN_URL;
    }
}

export async function getUsersByName(username) {
    const users = await sendRequestWithToken(`${USERS_URL}/all/${username}`, 'GET');
    return users;
}