var ak = require('../account-kit')

var isAuthenticated = (req, res, next) => {
  if(!req.body.auth) {
    res.status(401).send("Unauthorized")
  } else {
    var auth = JSON.parse(req.body.auth)
    checkAuth(auth).then((authed) => {
      if(authed) {
        return next()
      } else {
        res.status(401).send("Unauthorized")
      }
    })
  }
}

var checkAuth = (auth) => {
  return new Promise((resolve, reject) => {
      ak.accountDetails(auth.ak_access_token).then((account_details) => {
      resolve(auth.ak_user_id === account_details.id &&
              auth.phone === account_details.phone.national_number)
    }).catch((err) => {
      console.log(`error validating auth ${auth}. Error: ${err}`)
      reject(false)
    })
  });
}

module.exports = {
  checkAuth,
  isAuthenticated
}
