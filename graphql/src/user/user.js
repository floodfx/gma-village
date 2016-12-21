var { UserDAO } = require('gma-village-data-access');

const isProd = process.env.NODE_ENV === 'production'
const namespace = isProd ? null : "dev"

const userDao = new UserDAO(namespace)

var saveUser = (input, userKind) => {
  input.kind = userKind
  return userDao.save(input)
    .then(user => {
      return user
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

var findByPhone = (phone) => {
  console.log("findByPhone", phone)
  return new Promise((resolve, reject) => {
    userDao.findByPhone(phone)
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

var listUserByType = (userType, active) => {
  console.log("listUserByType", userType)
  return new Promise((resolve, reject) => {
    userDao.list(userType, active)
      .then(userList => {
        console.log("userList", userList)
        resolve(userList)
      })
      .catch(err => {
        reject(err)
      })
  })
}

var isAdmin = (user) => {
  return user && user.kind === "Admin"
}
var isGma = (user) => {
  return user && user.kind === "Gma"
}
var isParent = (user) => {
  return user && user.kind === "Parent"
}

var loadAppUserMiddleware = (req, res, next) => {
  console.log("fetching app user")
  if(req.accountKitUser) {
    console.log("have account kit user")
    userDao.findByPhone(req.accountKitUser.phone.national_number)
      .then((user) => {
        console.log("findByPhone user", user)
        req.appUser = user;
        next();
      })
      .catch((err) => {
      console.log("error fetching appUser: ", err);
      next();
    })
  } else {
    next();
  }
}

module.exports = {
  saveUser,
  userById,
  findByPhone,
  listUserByType,
  isAdmin,
  isGma,
  isParent,
  loadAppUserMiddleware
}
