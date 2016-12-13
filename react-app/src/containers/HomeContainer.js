import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { accountKitAuth }  from '../actions/AccountKitContainer'
import  { fetchAuthCookie, currentUser, saveAuthCookie }  from '../actions/Auth'
import UserNavContainer from './UserNavContainer'
import cookie from 'react-cookie';

class HomeContainer extends Component {

  render() {
    if(this.props.loading) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          <UserNavContainer />
          <h1>Welcome {this.props.user.first_name}!</h1>
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    user: auth.user,
    loading: auth.loading
  }
}

export default connect(mapStateToProps)(HomeContainer)
