import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { accountKitAuth }  from '../actions/AccountKitContainer';
import  { fetchAuthCookie, currentUser, saveAuthCookie }  from '../actions/Auth';
import AdminHome from '../components/AdminHome';
import cookie from 'react-cookie';

class HomeContainer extends Component {

  render() {
    const {user} = this.props;
    if(this.props.loading) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          {user.kind === "Admin" &&
            <AdminHome user={user}/>
          }
          {user.kind === "Gma" &&
            <GmaHome user={user} />
          }
          {user.kind === "Parent" &&
            <ParentHome user={user} />
          }
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
