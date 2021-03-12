const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.generate_model = (voicebotId, history, responseCallback) => {
  axios.post(
    config.apiUrl + "/api/voicebots/" + voicebotId + "/model"
  ).then((response) => {
    responseCallback(response);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error);
    errorsHelper.handleAxiosError(history, error);
  });
}
