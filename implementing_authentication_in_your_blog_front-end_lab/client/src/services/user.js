import * as baseService from "./base";

let loggedIn = false;

function isLoggedIn() {
  return loggedIn;
}

function checkLogin() {
  console.log('in checklogin');
  if (loggedIn) {
    console.log('i logged in');
    return Promise.resolve(true);
  } else {
    let authToken = baseService.populateAuthToken(); //need to set the auth token first since get will need it
    console.log(`My auth token is: ${authToken}`);
    return me()
      .then(user => {
        console.log(`User is: ${user}`);
        loggedIn = true;
        return Promise.resolve(true);
      })
      .catch((err) => {
        console.log('Err in check login');
        console.log(err);
        return Promise.resolve(false);
      });
  }
}

function login(email, password) {
  return baseService
    .makeFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json().then((jsonResponse) => {
          baseService.setAuthToken(jsonResponse.token); //auth/login will return a token if successful
          loggedIn = true;
        });
      } else if (response.status === 401) {
        return response.json().then(jsonResponse => {
          throw jsonResponse;
        });
      }
    });
}

function logout() {
  baseService.clearAuthToken();
  loggedIn = false;
}

//checks me which means check if the auth token is valid or if you're logged in
//if not, then you need to be redirected to the login screen
function me() {
  console.log('in me');
  return baseService.get("/api/users/me");
}

export { isLoggedIn, checkLogin, login, logout };
