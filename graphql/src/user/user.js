var { UserDAO } = require('gma-village-data-access');

const isProd = process.env.NODE_ENV === 'production'
const namespace = isProd ? "prod" : "dev"

const userDao = new UserDAO(namespace)

var saveUser = (input, userKind) => {
  if(!input.kind && userKind) {
    input.kind = userKind
  }
  return userDao.save(input)
    .then(user => {
      return user
    })
    .catch(err => {
      throw err
    })
}

var userById = (id) => {
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

var findByPhone = (phone, active=true) => {
  return new Promise((resolve, reject) => {
    userDao.findByPhone(phone, active)
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

var listUserByType = (userType, active) => {
  return new Promise((resolve, reject) => {
    userDao.list(userType, active)
      .then(userList => {
        resolve(userList)
      })
      .catch(err => {
        reject(err)
      })
  })
}

var isSelf = (user, id) => {
  console.log("user", user, "id", id)
  if(user && id) {
    return (`${user.id}` === `${id}`)
  }
  return false
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
  if(req.accountKitUser) {
    userDao.findByPhone(req.accountKitUser.phone.national_number)
      .then((user) => {
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
  isSelf,
  loadAppUserMiddleware
}
