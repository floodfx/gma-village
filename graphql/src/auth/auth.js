var ak = require('../account-kit')

// extract token from request and load account kit user
var loadAccountKitUserMiddleware = (req, res, next) => {
  if(req.token) {
    ak.accountDetails(req.token).then((account_details) => {
      req.accountKitUser = account_details;
      console.log("fetched account kit user:", req.accountKitUser)
      next();
    }).catch((err) => {
      console.log("error fetching accountKitUser: ", err);
      next();
    })
  } else {
    next();
  }
}

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

var checkHeaderAuth = (request) => {
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
  isAuthenticated,
  loadAccountKitUserMiddleware,
}
