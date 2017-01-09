var { UserDAO } = require('gma-village-data-access');
var ak = require('./account-kit')
var { checkAuth } = require('./auth/auth')
var {
  saveUser,
  userById,
  findByPhone,
  listUserByType,
  isAdmin,
  isGma,
  isParent
} = require('./user/user')
var config = require('./config')
var { UserError } = require('graphql-errors');

const setTimestamps = (input) => {
  const nowTimestamp = Math.floor(new Date().getTime()/1000)
  input.created_on_timestamp = input.created_on_timestamp ? input.created_on_timestamp : nowTimestamp
  input.member_since_timestamp = input.member_since_timestamp ? input.member_since_timestamp : nowTimestamp
}

const isNewSession = (user) => {
  const nowTimestamp = Math.floor(new Date().getTime()/1000)
  if(!user.last_login_timestamp || user.last_login_timestamp+(60*30) < nowTimestamp) {
    user.last_login_timestamp = nowTimestamp;
    return true
  }
  return false  
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
  admins: (root, {active, limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      if(isAdmin(context.appUser)) {
        resolve(listUserByType("Admin", active));
      } else {
        reject("Not Authorized")
      }
    })
  },
  admin: (root, {id}, context, info) => {
    return new Promise((resolve, reject) => {
      if(isAdmin(context.appUser)) {
        resolve(userById(id));
      } else {
        reject("Not Authorized")
      }
    })
  },
  currentUser: (root, input, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(appUser) {
        // ensure user is active before logging them in
        if(appUser.active) {
          // track new sessions
          if(isNewSession(appUser)) {
            saveUser(appUser).then((user) => {
              resolve(user);
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(appUser);
          }
        } else {
          reject("User is not active.")
        }
      } else {
        reject("Error fetching currentUser")
      }
    })
  },
  gma: (root, {id}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(appUser && !isGma(appUser)) {
        resolve(userById(id));
      } else {
        reject("Not Authorized")
      }
    })
  },
  gmas: (root, {active, limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      console.log("gmas", "active", active)
      const { appUser } = context;
      if(appUser && !isGma(appUser)) {
        resolve(listUserByType("Gma", active));
      } else {
        reject("Not Authorized")
      }
    })
  },
  parents: (root, {active, limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        resolve(listUserByType("Parent", active));
      } else {
        reject("Not Authorized")
      }
    })
  },
  parent: (root, {id}, context, info) => {
    return new Promise((resolve, reject) => {
      if(isAdmin(context.appUser)) {
        resolve(userById(id));
      } else {
        reject("Not Authorized")
      }
    })
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
            // now that we have the accessToken, fetch accountDetails
            ak.accountDetails(json.access_token)
              .then((adJson) => {
                // verify is a user and is active
                findByPhone(adJson.phone.national_number).then((user) => {
                  user.ak_user_id = json.id
                  user.ak_access_token = json.access_token
                  user.ak_token_refresh_interval_sec = json.token_refresh_interval_sec
                   // ensure user is active before logging them in
                  if(user.active) {
                    if(isNewSession(user)) {
                      saveUser(user).then((u) => {
                        resolve(u);
                      }).catch((err) => {
                        reject(err);
                      })
                    } else {
                      resolve(user);
                    }
                  } else {
                    reject("User not active.")
                  }
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
  saveAdmin: (root, {input}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        setTimestamps(input)
        saveUser(input, "Admin").then((u) => {
          console.log("savedAdmin", u)
          resolve(u);
        }).catch((err) => {
          reject(err);
        })
      } else {
        reject("Not Authorized")
      }
    })
  },
  saveGma: (root, {input}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        setTimestamps(input)
        saveUser(input, "Gma").then((u) => {
          resolve(u);
        }).catch((err) => {
          reject(err);
        })
      } else {
        reject("Not Authorized")
      }
    })
  },
  saveParent: (root, {input}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        setTimestamps(input)
        console.log("input", input)
        saveUser(input, "Parent").then((u) => {
          resolve(u);
        }).catch((err) => {
          reject(err);
        })
      } else {
        reject("Not Authorized")
      }
    })
  }
}

module.exports = root
