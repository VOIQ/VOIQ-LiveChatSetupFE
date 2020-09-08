const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (intentUtteranceId, voicebotId, responseText, history, responseCallback) => {
  axios.post(
    config.apiUrl + "/api/utterance_responses",
    {
      "intent_utterance_id": intentUtteranceId,
      "voicebot_id": voicebotId,
      "response": responseText
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

module.exports.delete = (intentResponseId, history, responseCallback) => {
  axios.delete(
    config.apiUrl + "/api/utterance_responses/"+intentResponseId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.read = (intentResponseId, history, responseCallback) => {
  axios.get(
    config.apiUrl + "/api/utterance_responses/"+intentResponseId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.readAll = (intentUtteranceId, voicebotId, history, responseCallback) => {
  axios.get(
    config.apiUrl + "/api/utterance_responses",
    {
      params: {
        intent_utterance_id: intentUtteranceId,
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

module.exports.update = (intentResponseId, answer, history, responseCallback) => {
  axios.put(
    config.apiUrl + "/api/utterance_responses/"+intentResponseId,
    {
      response: answer
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error);
    errorsHelper.handleAxiosError(history, error);
  });
}
