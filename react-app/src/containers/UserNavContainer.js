import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { logout }  from '../actions/Auth';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class UserNavContainer extends Component {

  onLogoutClick = () => {
    this.props.dispatch(logout())
    browserHistory.push("/login")
  }

  render() {
    const {user} = this.props;
    return (
      <div className="dt w-100 border-box tr v-mid bg-light-gray pv2 ph3 br3">
        <div className="dtc ttc w-20 tl">
          Hello,&nbsp;<Link to="me">{user.kind} {user.first_name}</Link>
        </div>
        <div className="dtc w-10 tr">
          <button onClick={() => this.onLogoutClick()} className="btn gma-orange-bg">Log out</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    user: auth.user,
    loading: auth.loading
  }
}

export default connect(mapStateToProps)(UserNavContainer)
