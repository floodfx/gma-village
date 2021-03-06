const config = require('./config')
const rp = require('request-promise');
const crypto = require('crypto-js')


const AK_APP_ID = config.get('AK_APP_ID')
const AK_APP_SECRET = config.get('AK_APP_SECRET')
const BASE_URL  = `https://graph.accountkit.com/${config.get('AK_APP_VERSION')}/`
const ME_URL    = `${BASE_URL}/me`
const TOKEN_URL = `${BASE_URL}/access_token`

var calc_app_secret_proof = (access_token) => {
  return ""+crypto.HmacSHA256(access_token, AK_APP_SECRET); // force into string
}

const ak = {

  accountDetails: (access_token) => {
    var appsecret_proof = calc_app_secret_proof(access_token);
    var options = {
        uri: ME_URL,
        qs: {
          access_token,
          appsecret_proof
        },
        json: true
    };
    return rp(options)
  },

  accessToken: (code) => {
    var access_token = ['AA', AK_APP_ID, AK_APP_SECRET].join('|');
    var options = {
      uri: TOKEN_URL,
      qs: {
        grant_type: 'authorization_code',
        code,
        access_token
      },
      json: true
    }
    return rp(options)
  }

}

module.exports = ak
