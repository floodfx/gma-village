var root = require('./graphql-root')

const resolvers = {
  Query: {
    accountKitInit: root.accountKitInit,
    admins: root.admins,
    currentUser: root.currentUser,
    gma: root.gma,
    gmas: root.gmas,
    parents: root.parents
  },
  Mutation: {
    saveAdmin: root.saveAdmin,
    saveGma: root.saveGma,
    saveParent: root.saveParent,
    accountKitAuth: root.accountKitAuth
  },

  User: {
    __resolveType(root, context, info){
      switch(root.kind) {
        case "Admin":
        case "Gma":
        case "Parent":
        return root.kind;
        default:
        return null;
      }
    },
  },
};

module.exports = resolvers
