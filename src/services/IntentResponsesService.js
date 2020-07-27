const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');

axios.defaults.withCredentials = true;

module.exports.create = (intentId, responseText, history, responseCallback) => {
  axios.post(
    "http://localhost:4000/api/intent_responses",
    {
      "intent_id": intentId,
      "response": responseText
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.delete = (intentResponseId, history, responseCallback) => {
  axios.delete(
    "http://localhost:4000/api/intent_responses/"+intentResponseId
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
    "http://localhost:4000/api/intent_responses/"+intentResponseId
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.readAll = (intentId, history, responseCallback) => {
  axios.get(
    "http://localhost:4000/api/intent_responses",
    {
      params: {
        intent_id: intentId
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
    "http://localhost:4000/api/intent_responses/"+intentResponseId,
    {
      response: answer
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
