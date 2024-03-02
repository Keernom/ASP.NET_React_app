import { ACCOUNT_URL, PROFILE_URL, sendRequestWithToken } from "./commonService";


export async function getUser() {
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

export async function updateUserAsync(user) {
    user.photo = user.photo.toString();
    var user = await sendRequestWithToken(ACCOUNT_URL, 'PATCH', user);
    window.location.href = PROFILE_URL;
    return user;
}