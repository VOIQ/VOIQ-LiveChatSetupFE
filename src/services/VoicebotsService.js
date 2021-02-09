const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (voicebot_name, history, responseCallback) => {
  axios.post(
    config.apiUrl + "/api/voicebots",
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
    config.apiUrl + "/api/voicebots/" + voicebotId
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
    config.apiUrl + "/api/voicebots"
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
    config.apiUrl + "/api/voicebots/" + voicebotId,
    data
  ).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.delete = (voicebotId, history, responseCallback) => {
  axios.delete(
    config.apiUrl + "/api/voicebots/" + voicebotId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
