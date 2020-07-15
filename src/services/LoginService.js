const axios = require('axios');

axios.defaults.withCredentials = true;

module.exports.authenticate = (email, password, responseCallback) => {
  axios.post(
  "http://localhost:4000/api/authenticate",
  {
    email: email,
    password: password
    }).then((response) => {
    console.log(response);
    responseCallback(response.data);
  }).catch((error) => {
    console.log(error);
  });
}

module.exports.authenticatedPing = (responseCallback) => {
  axios.get(
  "http://localhost:4000/api/authenticate/ping"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log(error);
  });
}
