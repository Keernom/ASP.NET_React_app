import { ACCOUNT_URL, sendRequestWithToken } from "./commonService";


export async function getUser() {
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}