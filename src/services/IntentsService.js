const axios = require('axios');
const errorsHelper = require('../helpers/ErrorsHelper');
const config = require('../config/voiq.json');

axios.defaults.withCredentials = true;

module.exports.read = (intentTypeId, voicebotId, history, responseCallback) => {
  axios.get(
    `${config.apiUrl}/api/voicebots/${voicebotId}/intents/intent_types/${intentTypeId}`
  ).then((response) => {
    responseCallback(response.data);
  }).catch((error) => {
    console.log("ERROR");
    console.log(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}

module.exports.create = (intentTypeId, voicebotId, name, codePrefix, history, responseCallback) => {
  let codeSlug = name.replace(/\s+/g, '_') // collapse whitespace and replace by _
                      .replace(/-+/g, '_'); // collapse dashes
  let code = `${codePrefix}_${codeSlug.toLowerCase()}`
  axios.post(
    `${config.apiUrl}/api/voicebots/${voicebotId}/intents`,
    {
      intent_type_id: intentTypeId,
      name: name,
      code: code
    }
  ).then((response) => {
    responseCallback(response);
  }).catch((error) => {
    console.log("ERROR");
    responseCallback(error.response);
    errorsHelper.handleAxiosError(history, error);
  });
}
