const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.create = (intentId, code, name, history, responseCallback) => {
  axios.post(
    `${config.apiUrl}/api/utterances`,
    {
      "intent_id": intentId,
      "code": code,
      "name": name
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

module.exports.delete = (utteranceId, history, responseCallback) => {
  axios.delete(
    `${config.apiUrl}/api/utterances/${utteranceId}`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.read = (utteranceId, history, responseCallback) => {
  axios.get(
    `${config.apiUrl}/api/utterances/${utteranceId}`
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
    `${config.apiUrl}/api/utterances`,
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

module.exports.update = (utteranceId, intentId, code, name, history, responseCallback) => {
  axios.put(
    `${config.apiUrl}/api/utterances/${utteranceId}`,
    {
      intent_id: intentId,
      code: code,
      "name": name
    }
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error);
    errorsHelper.handleAxiosError(history, error);
  });
}
