import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserNavContainer from './UserNavContainer';
import AdminProfileForm from '../components/AdminProfileForm';
import GmaProfileForm from '../components/GmaProfileForm';
import  { saveAdminUser, resetAdminUser }  from '../actions/AdminSave';
import  { saveGmaUser, resetGmaUser }  from '../actions/GmaSave';
import  { currentUser }  from '../actions/Auth';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';

class ProfileContainer extends Component {

  componentWillUnmount() {
    const { user, dispatch } = this.props;
    if(user.kind === "Admin") {
      dispatch(resetAdminUser());
    } else if(user.kind === "Gma") {
      dispatch(resetGmaUser());
    }
  }

  componentWillReceiveProps(nextProps) {
    // refresh current user after profile save
    if(!this.props.saved && nextProps.saved) {
      this.props.dispatch(currentUser(this.props.authCookie));
    }
  }

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
      const {user, saving, saved, admin, gma, error} = this.props
      return (
        <div>
          <h2 className="fw4">Edit My Profile</h2>
          {saved && 
            <Alert type="success" heading="Success" text="We have updated your profile." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={"Error updating your profile: "+error} />
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
    authCookie: auth.cookie,
    loading: auth.loading,
    saving: saveAdmin.saving || saveGma.saving,
    error: saveAdmin.error || saveGma.error,
    admin: saveAdmin.admin,
    gma: saveGma.gma,
    saved: saveAdmin.saved || saveGma.saved,
  }
}

export default connect(mapStateToProps)(ProfileContainer)
