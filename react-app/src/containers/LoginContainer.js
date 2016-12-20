import React, { Component } from 'react';
import Login from '../components/Login'
import { connect } from 'react-redux'
import  { accountKitAuth }  from '../actions/AccountKitContainer'
import  { fetchAuthCookie, currentUser, saveAuthCookie }  from '../actions/Auth'
import cookie from 'react-cookie';
import { browserHistory } from 'react-router'

class LoginContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  componentWillReceiveProps(nextProps) {
    // found auth cookie
    if(!this.props.cookie && nextProps.cookie) {
      this.props.dispatch(currentUser(nextProps.cookie))
    }
    // found current user
    else if(!this.props.user && nextProps.user) {
      const { user } = nextProps;
      if(!this.props.cookie) {
        const cookie = {
          id: user.id,
          phone: user.phone,
          ak_access_token: user.ak_access_token,
          ak_user_id: user.ak_user_id
        }
        this.props.dispatch(saveAuthCookie(cookie));
      }
      console.log("this.props.location.query.redirect", this.props.location.query.redirect)
      let redirect = this.props.location.query.redirect || "/home"
      browserHistory.push(redirect)
    }
  }

  auth = (csrfNonce, authCode) => {
    this.props.dispatch(accountKitAuth(csrfNonce, authCode))
  }

  onLoginClick = (e) => {
    console.log(e)
    if(this.props.inited) {
      this.phoneLogin("+1", e)
        .then((data) => {
          console.log("phone login", data)
          const {csrfNonce, authCode} = data;
          this.auth(csrfNonce, authCode);
        })
        .catch((error) => {
          console.log("error", error)
          this.setState({error: error.status})
          })
    } else {
      this.setState({error: "Attempted login while AccountKit not initialized."})
    }
  }

  phoneLogin(countryCode, phone) {
    return new Promise((resolve, reject) => {
      window.AccountKit.login('PHONE', {
        countryCode: countryCode,
        phoneNumber: phone
      }, (res) => {
        if (res.status === "PARTIALLY_AUTHENTICATED") {
          resolve({
            status: res.status,
            authCode: res.code,
            csrfNonce: res.state
          });
        }
        else {
          reject({status: res.status})
        }
      });
    });
  }

  render() {
    return (
      <Login onLoginClick={this.onLoginClick}
             initialized={this.props.inited}
             errors={this.props.errors}
             loadingMsg={this.props.loading}
             debug={process.env.NODE_ENV !== 'production'}/>
    )
  }

}

const mapStateToProps = (state) => {
  const { accountKitInit, auth } = state
  var errors = [auth.error, accountKitInit.error].filter(e => e);
  return {
    inited: accountKitInit.inited,
    errors: errors,
    user: auth.user,
    loading: accountKitInit.loading || auth.loading,
    cookie: auth.cookie
  }
}

export default connect(mapStateToProps)(LoginContainer)
