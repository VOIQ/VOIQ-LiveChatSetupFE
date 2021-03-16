const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (voicebotId, utteranceId, responseText, history, responseCallback) => {
  if(utteranceId) {
    axios.post(
      `${config.apiUrl}/api/voicebots/${voicebotId}/utterance_responses`,
      {
        "utterance_id": utteranceId,
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
}

module.exports.delete = (voicebotId, intentResponseId, history, responseCallback) => {
  axios.delete(
    `${config.apiUrl}/api/voicebots/${voicebotId}/utterance_responses/${intentResponseId}`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.readAll = (voicebotId, utteranceId, history, responseCallback) => {
  if(utteranceId) {
    axios.get(
      `${config.apiUrl}/api/voicebots/${voicebotId}/utterance_responses`,
      {
        params: {
          utterance_id: utteranceId
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
}

module.exports.update = (voicebotId, intentResponseId, answer, history, responseCallback) => {
  axios.put(
    `${config.apiUrl}/api/voicebots/${voicebotId}/utterance_responses/${intentResponseId}`,
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
