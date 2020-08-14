const authenticationHelper = require('./AuthenticationHelper');

module.exports.handleAxiosError = (history, error) => {
  if (error.response && error.response.status === 403) {
    authenticationHelper.logout(history);
  }
}