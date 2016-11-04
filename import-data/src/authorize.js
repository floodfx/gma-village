var google = require('googleapis');
var googleAuth = require('google-auth-library');

const DEFAULT_ERROR_MSG = 'Error getting using Application Default Credentials.  See: https://developers.google.com/identity/protocols/application-default-credentials?hl=en_US'

/**
 * Use Application Default Credentials to get authorize client.
 *
 * @param {string} scopes The authorization scope(s) requested
 */
var authorize = (scopes) => {
  return new Promise((resolve, reject) => {
    google.auth.getApplicationDefault(function(err, authClient) {
      if (err) {
        reject(`Error: ${err}. ${DEFAULT_ERROR_MSG}`);
      }
      if (authClient.createScopedRequired &&
          authClient.createScopedRequired()) {
        authClient = authClient.createScoped(scopes);
        resolve(authClient);
      } else {
        reject(DEFAULT_ERROR_MSG);
      }
    });
  });
}

module.exports = authorize
