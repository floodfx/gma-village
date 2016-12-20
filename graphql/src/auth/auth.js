var ak = require('../account-kit')

// extract token from request and load account kit user
var loadAccountKitUserMiddleware = (req, res, next) => {
  console.log("req.headers", req.headers)
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
  if(!req.accountKitUser) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
}

module.exports = {
  isAuthenticated,
  loadAccountKitUserMiddleware,
}
