const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.create = (data, history, responseCallback) => {
  axios.post(
    "http://localhost:4000/api/intents",
    data
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.read = (intentId, history, responseCallback) => {
  axios.get(
    "http://localhost:4000/api/intents/"+intentId
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
    "http://localhost:4000/api/intents"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.update = (intentId, data, history, responseCallback) => {
  axios.put(
    "http://localhost:4000/api/intents/"+intentId,
    data
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
