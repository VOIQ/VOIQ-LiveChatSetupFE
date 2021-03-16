const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (voicebotIntentId, name, intentCode, history, responseCallback) => {
  let code = `utter_${intentCode}`
  axios.post(
    `${config.apiUrl}/api/voicebot_intents/${voicebotIntentId}/utterances`,
    {
      name: name,
      code: code
    }
  ).then((response) => {
    responseCallback(response);
  }).catch((error) => {
    console.log("ERROR");
    responseCallback(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
