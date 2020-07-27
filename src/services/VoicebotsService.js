const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.create = (voicebot_name, history, responseCallback) => {
  axios.post(
    "http://localhost:4000/api/voicebots",
    {
      "voicebot_name": voicebot_name
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

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

module.exports.update = (voicebotId, data, history, responseCallback) => {
  axios.put(
    "http://localhost:4000/api/voicebots/"+voicebotId,
    data
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
