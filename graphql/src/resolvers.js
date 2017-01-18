var root = require('./graphql-root')

const resolvers = {
  Query: {
    accountKitInit: root.accountKitInit,
    admins: root.admins,
    admin: root.admin,
    currentUser: root.currentUser,
    gma: root.gma,
    gmas: root.gmas,
    parents: root.parents,
    parent: root.parent
  },
  Mutation: {
    saveAdmin: root.saveAdmin,
    saveGma: root.saveGma,
    saveParent: root.saveParent,
    saveCareNeed: root.saveCareNeed,
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
