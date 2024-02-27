export const ACCOUNT_URL = 'api/account';
export const USERS_URL = 'api/users';
export const POSTS_URL = 'api/posts';

const BASE_URL = 'login';
const TOKEN_NAME = 'Token';

export const PROFILE_URL = '/profile';
export const LOGIN_URL = '/login';

export async function getToken(login, password) {
    const url = ACCOUNT_URL + '/token';
    const token = await sendAuthentitacedRequest(url, 'POST', login, password);

    localStorage.setItem(TOKEN_NAME, token.accessToken);
    window.location.href = PROFILE_URL;
}

async function sendAuthentitacedRequest(url, method, username, password, data) {
    var headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

    if (data) {
        headers.set('Content-Type', 'application/json');
    }

    var reQuestOpts = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    };

    var resultFetch = await fetch(url, reQuestOpts);
    if (resultFetch.ok) {
        const result = await resultFetch.json();
        return result;
    } else {
        // Произошла ошибка при выполнении запроса
        throw new Error('Ошибка' + resultFetch.status + ':' + resultFetch.statusText);
    }
}

export async function sendRequestWithToken(url, method, data) {
    var headers = new Headers();
    const token = localStorage.getItem(TOKEN_NAME);

    headers.set('Authorization', `Bearer ${token}`);

    if (data) {
        headers.set('Content-Type', 'application/json');
    }

    var reQuestOpts = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    };

    var resultFetch = await fetch(url, reQuestOpts);
    if (resultFetch.ok) {
        const result = await resultFetch.json();
        return result;
    } else {
        // Произошла ошибка при выполнении запроса
        errorRequest(resultFetch.status);
    }
}

function errorRequest(status) {
    if (status === 401) {
        window.location.href = BASE_URL;
    }
}