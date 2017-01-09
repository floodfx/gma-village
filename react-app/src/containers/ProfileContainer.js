import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserNavContainer from './UserNavContainer';
import AdminProfileForm from '../components/AdminProfileForm';
import GmaProfileForm from '../components/GmaProfileForm';
import  { saveAdminUser }  from '../actions/AdminCreateFormContainer';
import  { saveGmaUser }  from '../actions/GmaCreateFormContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';

class ProfileContainer extends Component {

  onAdminProfileSubmit = (values) => {
    console.log("onAdminProfileSubmit", values)
    this.props.dispatch(saveAdminUser(values));
  }

  onGmaProfileSubmit = (values) => {
    console.log("onGmaProfileSubmit", values)
    this.props.dispatch(saveGmaUser(values));
  }

  render() {
    if(this.props.loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    } else {
      const {user, saving, admin, gma} = this.props
      return (
        <div>

          <h2 className="fw4">Edit My Profile</h2>
          {(admin || gma) && 
            <Alert type="success" heading="Success" text="We have updated your profile." />
          }
          {user.kind === "Admin" &&
            <AdminProfileForm onSubmit={this.onAdminProfileSubmit} saving={saving}/>
          }
          {user.kind === "Gma" &&
            <GmaProfileForm onSubmit={this.onGmaProfileSubmit} saving={saving}/>
          }
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { auth, saveAdmin, saveGma } = state
  return {
    user: auth.user,
    loading: auth.loading,
    saving: saveAdmin.saving || saveGma.saving,
    error: saveAdmin.error || saveGma.error,
    admin: saveAdmin.admin,
    gma: saveGma.gma,
    saved: saveAdmin.saved || saveGma.saved,
  }
}

export default connect(mapStateToProps)(ProfileContainer)
