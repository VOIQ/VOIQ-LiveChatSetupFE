const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.read = (voiceId, history, responseCallback) => {
  axios.get(
    "http://localhost:4000/api/voices/"+voiceId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.readAll = (history, responseCallback) => {
  axios.get(
    "http://localhost:4000/api/voices"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
