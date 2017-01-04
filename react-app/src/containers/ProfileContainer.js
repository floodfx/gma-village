import React, { Component } from 'react';
import { connect } from 'react-redux'
import UserNavContainer from './UserNavContainer'
import AdminProfileForm from '../components/AdminProfileForm'
import GmaProfileForm from '../components/GmaProfileForm'

class ProfileContainer extends Component {

  onAdminProfileSubmit = (values) => {
    console.log("onAdminProfileSubmit", values)

  }

  render() {
    if(this.props.loading) {
      return (
        <div>Loading...</div>
      )
    } else {
      const {user} = this.props
      return (
        <div>
          {user.kind === "Admin" &&
            <AdminProfileForm onSubmit={this.onAdminProfileSubmit}/>
          }
          {user.kind === "Gma" &&
            <GmaProfileForm onSubmit={this.onAdminProfileSubmit}/>
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

export default connect(mapStateToProps)(ProfileContainer)
