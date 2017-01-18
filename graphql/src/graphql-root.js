var { UserDAO } = require('gma-village-data-access');
var ak = require('./account-kit');
var { checkAuth } = require('./auth/auth');
var {
  saveUser,
  userById,
  findByPhone,
  listUserByType,
  isAdmin,
  isGma,
  isParent
} = require('./user/user');
var config = require('./config');
var { buildMessage } = require('./careNeed/message');
var { sendSMS } = require('./send/sms'); 

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
      console.log("AppUser", appUser);
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
        resolve({
          user: null,
          errors: [
            {
              id: "10",
              message: "CSRF Validation Failed"
            }
          ]
        });
      } else {
        // use ak client to get accessToken
        ak.accessToken(authCode)
          .then((json) => {
            // now that we have the accessToken, fetch accountDetails
            ak.accountDetails(json.access_token)
              .then((adJson) => {
                // verify is a user and is active
                findByPhone(adJson.phone.national_number).then((user) => {
                  if(user) {
                    user.ak_user_id = json.id
                    user.ak_access_token = json.access_token
                    user.ak_token_refresh_interval_sec = json.token_refresh_interval_sec                    
                    if(isNewSession(user)) {
                      saveUser(user).then((u) => {
                        resolve({
                          user: u,
                          errors: []
                        });
                      }).catch((err) => {
                        resolve({
                          user: null,
                          errors: [
                            {
                              id: "20",
                              message: err
                            }
                          ]
                        });
                      })
                    } else {
                      resolve({
                        user,
                        errors: []
                      });
                    }
                  } else {
                    resolve({
                      user: null,
                      errors: [
                        {
                          id: "30",
                          message: "User not Active"
                        }
                      ]
                    });
                  }
                }).catch((err) => {
                  resolve({
                    user: null,
                    errors: [
                      {
                        id: "20",
                        message: err
                      }
                    ]
                  });
                })
              })
              .catch((error) => {
                resolve({
                  user: null,
                  errors: [
                    {
                      id: "20",
                      message: error
                    }
                  ]
                });
              })
          })
          .catch((error) => {
            resolve({
              user: null,
              errors: [
                {
                  id: "20",
                  message: error
                }
              ]
            });
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
        saveUser(input, "Parent").then((u) => {
          resolve(u);
        }).catch((err) => {
          reject(err);
        })
      } else {
        reject("Not Authorized")
      }
    })
  },
  saveCareNeed: (root, {input}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser) || isParent(appUser)) {
        userById(input.parentId).then((parent) => {
          var msg = buildMessage(
            parent,
            input.kids,
            input.neighborhood,
            input.otherNeighborhood,
            input.startDateTimeOfNeed,
            input.endDateTimeOfNeed
          );
          console.log("sms message", msg)
          sendSMS(msg, "14157027236").then((data) => {
            resolve(data.MessageId);
          }).catch((err) => {
            reject(err);
          })
        })        
      } else {
        reject("Not Authorized")
      }
    })
  }
}

module.exports = root
