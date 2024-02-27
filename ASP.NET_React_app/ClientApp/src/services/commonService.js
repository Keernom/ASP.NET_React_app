const ACCOUNT_URL = 'api/account';
const USERS_URL = 'api/users';
const POSTS_URL = 'api/posts';

const BASE_URL = 'login';

function sendRequset(url, successAction, errorAction) {
    fetch(url)
        .then(response => {
            if (response == 401) {
                window.location.href = BASE_URL;
            } else {
                // Обработка успешного ответа
                successAction();
            }
        })
        .catch(error => {
            // Обработка ошибки запроса
            errorAction();
        })
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

export async function getToken(login, password) {
    const url = ACCOUNT_URL + '/token';
    const token = await sendAuthentitacedRequest(url, 'POST', login, password);
    console.log(token.accessToken);
}

