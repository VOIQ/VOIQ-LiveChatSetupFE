const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.read = (history, responseCallback) => {
  axios.get(
    `${config.apiUrl}/api/users`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.update = (history, data, responseCallback) => {
  axios.put(
    `${config.apiUrl}/api/users`,
    data
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    responseCallback(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
