import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { logout }  from '../actions/Auth';
import { browserHistory, Link } from 'react-router';

class UserNavContainer extends Component {

  onLogoutClick = () => {
    this.props.dispatch(logout())
    browserHistory.push("/login/")
  }

  matchRoute = (routeName) => {
    const {location} = this.props;
    console.log("this.props.location",location)
    console.log("indexOf",routeName, location.pathname.indexOf(routeName))
    return location.pathname.indexOf(routeName) >= 0 ? "active" : undefined
  }

  render() {
    const {user, location} = this.props;
    if(user) {
      return (
        <nav >
          <ul className="nav nav-tabs">
            <li role="presentation" className={this.matchRoute("home")}>
              <Link to="/home" activeClassName="active">Home</Link>
            </li>
            <li role="presentation" className={this.matchRoute("profile")}>
              <Link to="/profile">My Profile</Link>
            </li>
            { user.kind === "Admin" &&
              <li role="presentation" className={this.matchRoute("admin")}>
                <Link to="/admin/list">Admins</Link>
              </li>              
            }
            { (user.kind === "Admin" || user.kind === "Parent") &&
              <li role="presentation" className={this.matchRoute("gma")}>
                <Link to="/gma/list">Gmas</Link>
              </li>
            }
            { user.kind === "Admin" &&
              <li role="presentation" className={this.matchRoute("parent")}>
                <Link to="/parent/list">Parents</Link>
              </li>
            }   
            
            
          </ul>
        </nav>
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
