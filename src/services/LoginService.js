const axios = require('axios');
const config = require('../config/voiq.json');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.authenticate = (email, password, responseCallback) => {
  axios.post(
  config.apiUrl + "/api/authenticate",
  {
    email: email,
    password: password
  }).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.authenticatedPing = (responseCallback) => {
  axios.get(
  config.apiUrl + "/api/authenticate/ping"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.logout = (history) => {
  axios.post(
    config.apiUrl + "/api/authenticate/logout"
  ).then((response) => {
    history.push('/login');
  }).catch((error) => {
    console.log(error);
  });
}
