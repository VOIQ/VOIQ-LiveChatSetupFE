const axios = require('axios');

module.exports.authenticate = (email, password, responseCallback) => {
  axios.post(
  "http://localhost:4000/api/authenticate",
  {
    email: email,
    password: password
  }).then((response) => {
    console.log(response);
    responseCallback(response.data);
  }).catch((error) => {
    console.log(error);
    console.log(error.response.data);
  });
}

module.exports.authenticatedPing = (token, responseCallback) => {
  if (token) {
    return axios.get(
    "http://localhost:4000/api/authenticate/ping",
    {
      headers: {
        'Authorization': token,
      }
    }).then((response) => {
      responseCallback(response.data);
    }).catch((error) => {
      console.log(error);
      console.log(error.response.data);
    });
  } else {
    throw new Error("Invalid token");
  }
}
