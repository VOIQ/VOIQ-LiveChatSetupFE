const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.read = (voicebotId, history, responseCallback) => {
  axios.get(
    "http://localhost:4000/api/voicebots/"+voicebotId
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
    "http://localhost:4000/api/voicebots"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.create = (data, history, responseCallback) => {
  axios.post(
    "http://localhost:4000/api/voicebots",
    data
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
