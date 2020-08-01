const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.generateAll = (voicebotId, history, responseCallback) => {
  axios.post(
    config.apiUrl+"/api/voicebots/responses",
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

module.exports.progress = (voicebotId, history, responseCallback) => {
  axios.get(
    config.apiUrl+"/api/voicebots/responses/progress",
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
