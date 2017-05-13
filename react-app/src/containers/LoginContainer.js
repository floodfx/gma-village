import React, { Component } from 'react';
import Login from '../components/Login';
import AccountKitContainer from './AccountKitContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { browserHistory } from 'react-router';
import { ActionCreators } from '../actions';

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calledCurrentUser: false
    };
  }

  componentWillMount() {
    this.props.fetchAuthCookie();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps", nextProps)
    // call if fetchAuthCookie succeeds but only
    // when graphQLClient has the Auth header
    if(nextProps.cookie &&
      !this.state.calledCurrentUser) {
      // console.log("calling currentUser with account_kit_access_token:"+nextProps.cookie.account_kit_access_token)
      this.props.currentUser(nextProps.cookie.account_kit_access_token);
      this.setState({calledCurrentUser: true});
    } else if(this.props.cookie && !nextProps.cookie) {
      this.setState({calledCurrentUser: false});
    }
    // got current user
    if(!this.props.user && nextProps.user) {
      const { user } = nextProps;
      if(!this.props.cookie) {
        const cookie = {
          id: user.id,
          phone: user.phone,
          account_kit_access_token: user.account_kit_access_token,
          account_kit_user_id: user.account_kit_user_id
        }
        this.props.saveAuthCookie(cookie);
      }
      if(user.accepted_terms) {
        let redirect = this.props.location.query.redirect || "/home"
        browserHistory.push(redirect)
      } else {
        browserHistory.push('/profile#tos');
      }
    }
  }

  auth = (csrfNonce, authCode) => {
    this.props.accountKitAuth(csrfNonce, authCode);
  }

  onLoginClick = (e) => {
    if(this.props.accountKitInited) {
      this.phoneLogin("+1", e)
        .then((data) => {
          // console.log("phone login", data)
          const {csrfNonce, authCode} = data;
          this.auth(csrfNonce, authCode);
        })
        .catch((error) => {
          // console.log("error", error)
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
    const {loading, accountKitInited, errors} = this.props;
    return (
      <div>
      <AccountKitContainer
        debug={process.env.NODE_ENV !== 'production'}/>
      {(loading || !accountKitInited) &&
        <LoadingIndicator text="Attempting to Login..." />
      }
      {(!loading && accountKitInited) &&
        <Login
          onLoginClick={this.onLoginClick}
          errors={errors}
          accountKitInited={accountKitInited}/>
      }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { accountKitInit, auth } = state;
  var errors = [];
  if(auth.error) {
    errors.push(auth.error);
  }
  if(accountKitInit.error) {
    errors.push(accountKitInit.error);
  }
  return {
    accountKitInited: accountKitInit.inited,
    errors: errors,
    user: auth.user,
    loading: accountKitInit.loading || auth.loading,
    cookie: auth.cookie
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
