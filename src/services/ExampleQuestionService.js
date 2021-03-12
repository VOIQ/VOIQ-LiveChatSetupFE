const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (voicebotId, question, history, responseCallback) => {
  axios.post(
    `${config.apiUrl}/api/voicebots/${voicebotId}/example_questions`,
    {
      "question": question
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

module.exports.delete = (questionId, voicebotId, history, responseCallback) => {
  axios.delete(
    `${config.apiUrl}/api/voicebots/${voicebotId}/example_questions/${questionId}`
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
    `${config.apiUrl}/api/voicebots/${voicebotId}/example_questions`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.update = (questionId, question, voicebotId, history, responseCallback) => {
  axios.put(
    `${config.apiUrl}/api/voicebots/${voicebotId}/example_questions/${questionId}`,
    {
      question: question
    }
  ).catch((error) => {
    console.log("ERROR");
    console.log(error);
    errorsHelper.handleAxiosError(history, error);
  });
}
