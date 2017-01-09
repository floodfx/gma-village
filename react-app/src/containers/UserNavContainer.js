import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { logout }  from '../actions/Auth';
import { browserHistory, Link } from 'react-router';
import FlagsBanner from '../components/FlagsBanner';

class UserNavContainer extends Component {

  onLogoutClick = () => {
    this.props.dispatch(logout())
    browserHistory.push("/login/")
  }

  matchRoute = (routeName) => {
    const {location} = this.props;
    return location.pathname.indexOf(routeName) >= 0 ? "active" : undefined
  }

  render() {
    const { user } = this.props;
    if(user) {
      return (
        <div>
        <nav className="mb4">
          <ul className="nav nav-tabs">
            <li role="presentation" className={this.matchRoute("home")}>
              <Link className="gma-nav-font fw6 ttu gray tracked f4" to="/home">Home</Link>
            </li>
            <li role="presentation" className={this.matchRoute("profile")}>
              <Link className="gma-nav-font fw6 ttu gray tracked f4" to="/profile">My Profile</Link>
            </li>
            { user.kind === "Admin" &&
              <li role="presentation" className={this.matchRoute("admin")}>
                <Link className="gma-nav-font fw6 ttu gray tracked f4" to="/admin/list">Admins</Link>
              </li>              
            }
            { (user.kind === "Admin" || user.kind === "Parent") &&
              <li role="presentation" className={this.matchRoute("gma")}>
                <Link className="gma-nav-font fw6 ttu gray tracked f4" to="/gma/list">Gmas</Link>
              </li>
            }
            { user.kind === "Admin" &&
              <li role="presentation" className={this.matchRoute("parent")}>
                <Link className="gma-nav-font fw6 ttu gray tracked f4" to="/parent/list">Parents</Link>
              </li>
            }     
            <button className="pull-right mt1 btn gma-orange-bg" onClick={() => this.onLogoutClick()}>Log out</button>
          </ul>
          
        </nav>
        <FlagsBanner />
        </div>
      )
    } else {
      return null;
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

export default connect(mapStateToProps)(UserNavContainer)
