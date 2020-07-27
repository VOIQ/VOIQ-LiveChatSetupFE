const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.create = (file, fileType, voicebotId, history, responseCallback) => {
  axios.post(
    "http://localhost:4000/api/voicebot_images",
    {
      voicebot_id: voicebotId,
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
    "http://localhost:4000/api/voicebot_images/"+voicebotId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
