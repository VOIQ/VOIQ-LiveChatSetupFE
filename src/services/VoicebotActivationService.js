const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.generateResponses = (voicebotId, history, responseCallback) => {
  axios.post(
    config.apiUrl + "/api/voicebot_activation/responses",
    {
      "voicebot_id": voicebotId
    }
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
    config.apiUrl + "/api/voicebot_activation",
    {
      "voicebot_id": voicebotId,
      "authorized_domain": authorizedDomain
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.progress = (voicebotId, history, responseCallback) => {
  axios.get(
    config.apiUrl + "/api/voicebot_activation/progress",
    {
      params: {
        voicebot_id: voicebotId
      }
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
