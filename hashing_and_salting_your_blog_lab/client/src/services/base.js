import 'isomorphic-fetch';

const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';

function setAuthToken(token) {
    authToken = `Bearer ${token}`;
    if (localStorage) { //localStorage is a global variable i guess like window
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    }
}

function clearAuthToken() {
    authToken = '';
    if (localStorage) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
}

function populateAuthToken() { //repopulate the local auth token variable
    if (localStorage) {
        let token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token && token !== null) {
            authToken = token;
        }
    }
    return authToken;
}

function makeFetch(url, info) {
    return fetch(url, info);
}

function json(url, method = 'GET', payload = {}) {
    let data = {
        method,
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json', //body parser won't kick in unless content type is set to application/json
            'Authorization': authToken
        })
    };
    if (method === 'GET') {
        delete data.body; //cannot have a body in a get request
    }
    return makeFetch(url, data).then(response => {
        if (response.ok) { //200 - 300 series status code
            return response.json();
        } else { //400 - 500 series status code
            throw response; //causes promise to reject -- want to reject if you get a 400 or 500 response
        }
    });
}

function get(url) { return json(url); }
function post(url, payload) { return json(url, 'POST', payload)};
function put(url, payload) { return json(url, 'PUT', payload)};
function destroy(url, payload) { return json(url, 'DELETE', payload)};

export {setAuthToken, clearAuthToken, populateAuthToken, makeFetch, get, post, put, destroy};

