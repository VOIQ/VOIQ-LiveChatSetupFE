const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (file, fileType, voicebotId, history, responseCallback) => {
  axios.post(
    config.apiUrl + "/api/voicebots/" + voicebotId + "/voicebot_images",
    {
      file: file,
      file_type: fileType
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
    config.apiUrl + "/api/voicebots/" + voicebotId + "/voicebot_images"
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
