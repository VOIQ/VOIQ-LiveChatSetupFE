const axios = require('axios');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.authenticate = (email, password, responseCallback) => {
  axios.post(
  config.apiUrl+"/api/authenticate",
  {
    email: email,
    password: password
  }).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log(error);
  });
}

module.exports.authenticatedPing = (responseCallback) => {
  axios.get(
  config.apiUrl+"/api/authenticate/ping"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log(error);
  });
}
