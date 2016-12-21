
class AuthListener {
  constructor(store) {
    this.store = store;
    this.currentUser = undefined;
  }

  listen = () => {
    let previousUser = this.currentUser;
    this.currentUser = this.store.getState().auth.user
    if(this.currentUser !== previousUser) {
      console.log("user changed", this.currentUser)
    }
  }

  loggedIn = () => {
    return !!this.currentUser
  }

  isAdmin = () => {
    if(this.loggedIn()) {
      return this.currentUser.kind === "Admin"
    }
    return false;
  }

  isParent = () => {
    if(this.loggedIn()) {
      return this.currentUser.kind === "Parent"
    }
    return false;
  }

  isGma = () => {
    if(this.loggedIn()) {
      return this.currentUser.kind === "Gma"
    }
    return false;
  }

  replaceWithNextPath = (nextState, replace) => {
    replace({
      pathname: '/login/',
      query: {redirect: nextState.location.pathname}
    })
  }

  requireParent = (nextState, replace) => {
    console.log("requireParent")
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    } else if(!(this.isParent() || this.isAdmin())) {
      replace({
        pathname: '/home'
      })
    }
  }

  requireGma = (nextState, replace) => {
    console.log("requireGma")
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    } else if(!(this.isGma() || this.isAdmin())) {
      replace({
        pathname: '/home'
      })
    }
  }

  requireAdmin = (nextState, replace) => {
    console.log("requireAdmin")
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    } else if(!this.isAdmin()) {
      replace({
        pathname: '/home'
      })
    }
  }

  requireUser = (nextState, replace) => {
    console.log("requireUser")
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    }
  }
}

export default AuthListener
