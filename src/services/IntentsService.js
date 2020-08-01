const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (data, history, responseCallback) => {
  axios.post(
    config.apiUrl+"/api/intents",
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
    config.apiUrl+"/api/intents/"+intentId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.readAll = (voicebotId, history, responseCallback) => {
  axios.get(
    config.apiUrl+"/api/intents",
    {
      params: {
        voicebot_id: voicebotId
      }
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error);
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.update = (intentId, data, history, responseCallback) => {
  axios.put(
    config.apiUrl+"/api/intents/"+intentId,
    data
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
