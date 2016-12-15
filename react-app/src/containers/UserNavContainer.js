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
      <div className="dt w-100 border-box tr v-mid">
        <div className="dtc ttc w-90 tl">
          Hello,&nbsp;<Link activeClassName="active" to="me">{user.kind} {user.first_name}</Link>
        </div>
        <div className="dtc ttc w-90 tl">
          <Link activeClassName="active" to="gma/create">Create Gma</Link>
        </div>
        <div className="dtc w-10 tr">
          <button onClick={() => this.onLogoutClick()} className="gma-orange-bg b--black ba bw1 br3 pa2">Log out</button>
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
