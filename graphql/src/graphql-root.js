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

const root = {
  // QUERIES
  accountKitInit: () => {
    return {
      appId:   config.get('AK_APP_ID'),
      csrf:    config.get('CSRF'),
      version: config.get('AK_APP_VERSION')
    }
  },
  admins: (root, {limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      if(isAdmin(context.appUser)) {
        resolve(listByType("Admin"));
      } else {
        reject("Not Authorized")
      }
    })
  },
  currentUser: (root, input, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(appUser) {
        resolve(appUser)
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
  gmas: (root, {limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(appUser && !isGma(appUser)) {
        resolve(listByType("Gma"));
      } else {
        reject("Not Authorized")
      }
    })
  },
  parents: (root, {limit, nextToken}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        resolve(listByType("Parent"));
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
  saveAdmin: (root, {input}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        resolve(saveUser(input, "Admin"));
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
        resolve(saveUser(input, "Gma"));
      } else {
        reject("Not Authorized")
      }
    })
  },
  saveParent: (root, {input}, context, info) => {
    return new Promise((resolve, reject) => {
      const { appUser } = context;
      if(isAdmin(appUser)) {
        resolve(saveUser(input, "Parent"));
      } else {
        reject("Not Authorized")
      }
    })
  }
}

module.exports = root
