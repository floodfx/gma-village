
class AuthListener {
  constructor(store) {
    this.store = store;
    this.currentUser = undefined;
  }

  listen = () => {
    let previousUser = this.currentUser;
    this.currentUser = this.store.getState().auth.user
    if(this.currentUser !== previousUser) {
      //console.log("user changed", this.currentUser)
    }
  }

  loggedIn = () => {
    return !!this.currentUser
  }

  isAdmin = () => {
    if(this.loggedIn()) {
      return this.currentUser.user_type === "ADMIN"
    }
    return false;
  }

  isParent = () => {
    if(this.loggedIn()) {
      return this.currentUser.user_type === "PARENT"
    }
    return false;
  }

  isGma = () => {
    if(this.loggedIn()) {
      return this.currentUser.user_type === "GMA"
    }
    return false;
  }

  replaceWithNextPath = (nextState, replace) => {
    replace({
      pathname: '/login',
      query: {redirect: nextState.location.pathname}
    })
  }

  requireParent = (nextState, replace) => {
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    } else if(!(this.isParent() || this.isAdmin())) {
      replace({
        pathname: '/home'
      })
    }
  }

  requireGma = (nextState, replace) => {
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    } else if(!(this.isGma() || this.isAdmin())) {
      replace({
        pathname: '/home'
      })
    }
  }

  requireAdmin = (nextState, replace) => {
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    } else if(!this.isAdmin()) {
      replace({
        pathname: '/home'
      })
    }
  }

  requireUser = (nextState, replace) => {
    if (!this.loggedIn()) {
      this.replaceWithNextPath(nextState, replace);
    }
  }
}

export default AuthListener
