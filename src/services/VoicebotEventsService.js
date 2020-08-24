const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.readSessionConversations = (sessionId, history, responseCallback) => {
  axios.get(
    config.apiUrl + "/api/voicebot_events/conversations/" + sessionId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.readVoicebotSessions = (voicebotId, page, history, responseCallback) => {
  axios.get(
    config.apiUrl + "/api/voicebot_events/sessions/" + voicebotId,
    { params: { page: page } }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
