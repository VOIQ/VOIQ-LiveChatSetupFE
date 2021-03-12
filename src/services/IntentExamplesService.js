const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.readAll = (intentId, history, responseCallback) => {
  axios.get(
    `${config.apiUrl}/api/intents/${intentId}/intent_examples` 
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log(error);
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.create = (intentId, exampleText, history, responseCallback) => {
  if(intentId) {
    axios.post(
      `${config.apiUrl}/api/intents/${intentId}/intent_examples`,
      {
        "example": exampleText
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

module.exports.update = (intentId, intentExampleId, example, history, responseCallback) => {
  axios.put(
    `${config.apiUrl}/api/intents/${intentId}/intent_examples/${intentExampleId}`,
    {
      example: example
    }
  ).then((response) => {
    responseCallback(response);
  }).catch((error) => {
    console.log("ERROR");
    responseCallback(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.delete = (intentId, intentExampleId, history, responseCallback) => {
  axios.delete(
    `${config.apiUrl}/api/intents/${intentId}/intent_examples/${intentExampleId}`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
