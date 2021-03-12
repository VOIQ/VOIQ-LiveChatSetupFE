const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.generateResponses = (voicebotId, history, responseCallback) => {
  axios.post(
    `${config.apiUrl}/api/voicebots/${voicebotId}/voicebot_activation/responses`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.generateActions = (voicebotId, history, responseCallback) => {
  axios.post(
    `${config.apiUrl}/api/voicebots/${voicebotId}/voicebot_activation/actions`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.activate = (voicebotId, authorizedDomain, history, responseCallback) => {
  axios.post(
    `${config.apiUrl}/api/voicebots/${voicebotId}/voicebot_activation`,
    {
      "authorized_domain": authorizedDomain
    }
  ).then((response) => {
    responseCallback(response);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.progress = (voicebotId, history, responseCallback) => {
  axios.get(
    `${config.apiUrl}/api/voicebots/${voicebotId}/voicebot_activation/progress`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
