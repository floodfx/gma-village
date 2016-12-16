var { UserDAO } = require('gma-village-data-access');
var ak = require('./account-kit')
var { checkAuth } = require('./auth/auth')
var config = require('./config')
var { UserError } = require('graphql-errors');

const isProd = process.env.NODE_ENV === 'production'
const namespace = isProd ? null : "dev"

const userDao = new UserDAO(namespace)

var saveUser = (input, kind) => {
  input.kind = kind
  return userDao.save(input)
    .then(gma => {
      return gma
    })
    .catch(err => {
      throw err
    })
}

var userById = (id) => {
  console.log("userById", id)
  return new Promise((resolve, reject) => {
    userDao.get(parseInt(id, 10))
      .then(user => {
        resolve(user)
      })
      .catch(err => {
        reject(err)
      })
  });
}

var listByType = (userType) => {
  console.log("listByType", userType)
  return new Promise((resolve, reject) => {
    userDao.list(userType)
      .then(gmaList => {
        resolve(gmaList)
      })
      .catch(err => {
        reject(err)
      })
  })
}

var isAdmin = (user) => {
  return user.kind === "Admin"
}
var isGma = (user) => {
  return user.kind === "Gma"
}
var isParent = (user) => {
  return user.kind === "Parent"
}

var currentUser = (auth) => {
  return userById(auth.id)
}

const root = {
  // QUERIES
  accountKitInit: () => {
    return {
      appId:   config.get('AK_APP_ID'),
      csrf:    config.get('CSRF'),
      version: config.get('AK_APP_VERSION')
    }
  },
  admins: (root, {auth, limit, nextToken}, context, info) => {
    checkAuth(auth).then((authed) => {
      if(authed) {
        if(isAdmin(currentUser(auth))) {
          return listByType("Admin")
        } else {
          throw new UserError("Not Authorized")
        }
      } else {
        throw new UserError("Authentication Error")
      }
    }).catch(() => {
      throw new UserError("Authentication Error")
    })
  },
  currentUser: (root, {auth}, context, info) => {
    return new Promise((resolve, reject) => {
      checkAuth(auth).then((authed) => {
        console.log("authed?", authed)
        if(authed) {
          currentUser(auth).then((user) => {
            user.ak_access_token = auth.ak_access_token;
            user.ak_user_id = auth.ak_user_id;
            console.log("user", user)
            resolve(user);
          }).catch((err) => {
            console.log("error fetching current user", err)
            reject(null)
          })
        } else {
          console.log("auth failure for currentUser:", auth)
          reject(null)
        }
      }).catch((e) => {
        reject(null)
      })
    })
  },
  gma: (root, {auth, id}, context, info) => {
    if(checkAuth(auth)) {
      if(!isGma(currentUser(auth))) {
        return userById(id)
      } else {
        throw new UserError("Not Authorized")
      }
    } else {
      throw new UserError("Authentication Error")
    }
  },
  gmas: (root, {auth, limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      checkAuth(auth).then((authed) => {
        console.log("authed?", authed)
        if(authed) {
          currentUser(auth).then((user) => {
            if(!isGma(user)) {
              listByType("Gma").then((gmas) => {
                resolve(gmas)
              }).catch((err) => {
                reject(err)
              })
            }
          }).catch((err) => {
            console.log("error fetching current user", err)
            reject(null)
          })
        } else {
          console.log("auth failure for currentUser:", auth)
          reject(null)
        }
      }).catch((e) => {
        reject(null)
      })
    })
  },
  parents: (root, {auth, limit, nextToken}, context, info) => {
    if(checkAuth(auth)) {
      if(isAdmin(currentUser(auth))) {
        return listByType("Parent")
      } else {
        throw "Not Authorized"
      }
    } else {
      throw "Authentication Error"
    }
  },

  // MUTATIONS
  accountKitAuth: (root, {csrfNonce, authCode}, context, info) => {
    return new Promise((resolve, reject) => {
      if(config.get('CSRF') !== csrfNonce) {
        reject("CSRF Validation Failed");
      } else {
        // use ak client to get accessToken
        ak.accessToken(authCode)
          .then((json) => {
            console.log("accessToken json result:", json)
            // now that we have the accessToken, fetch accountDetails
            ak.accountDetails(json.access_token)
              .then((adJson) => {
                console.log("accoundDetails json result:", adJson)
                // verify is a user and is active
                userDao.findByPhone(adJson.phone.national_number).then((user) => {
                  console.log("user", user)
                  user.ak_user_id = json.id
                  user.ak_access_token = json.access_token
                  user.ak_token_refresh_interval_sec = json.token_refresh_interval_sec
                  resolve(user)
                }).catch((err) => {
                  reject(new UserError(err))
                })
              })
              .catch((error) => {
                console.log(error, "\n\n\n")
                //TODO this can't be right
                reject(error.error.error.message)
              })
          })
          .catch((error) => {
            console.log(error, "\n\n\n")
            //TODO this can't be right
            reject(error.error.error.message)
          });
      }
    });
  },
  saveAdmin: (root, {auth, input}, context, info) => {
    if(checkAuth(auth)) {
      if(isAdmin(currentUser(auth))) {
        return saveUser(input, "Admin")
      } else {
        throw "Not Authorized"
      }
    } else {
      throw "Authentication Error"
    }
  },
  saveGma: (root, {auth, input}, context, info) => {
    if(checkAuth(auth)) {
      if(input.id === auth.id || isAdmin(currentUser(auth))) {
        return saveUser(input, "Admin")
      } else {
        throw "Not Authorized"
      }
    } else {
      throw "Authentication Error"
    }
  },
  saveParent: (root, {auth, input}, context, info) => {
    if(checkAuth(auth)) {
      if(input.id === auth.id || isAdmin(currentUser(auth))) {
        return saveUser(input, "Parent")
      } else {
        throw "Not Authorized"
      }
    } else {
      throw "Authentication Error"
    }
  }
}

module.exports = root
