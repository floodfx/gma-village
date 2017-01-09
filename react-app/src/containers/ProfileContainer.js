import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserNavContainer from './UserNavContainer';
import AdminForm from '../components/AdminForm';
import GmaForm from '../components/GmaForm';
import  { saveAdminUser, resetAdminUser }  from '../actions/AdminSave';
import  { saveGmaUser, resetGmaUser }  from '../actions/GmaSave';
import  { saveParentUser, resetParentUser }  from '../actions/ParentSave';
import  { currentUser }  from '../actions/Auth';
import  { uploadImage }  from '../actions/UploadImage';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';

class ProfileContainer extends Component {

  componentWillUnmount() {
    const { user, dispatch } = this.props;
    if(user.kind === "Admin") {
      dispatch(resetAdminUser());
    } else if(user.kind === "Gma") {
      dispatch(resetGmaUser());
    } else if(user.kind === "Parent") {
      dispatch(resetParentUser());
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
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveAdminUser(values))
  }

  onGmaProfileSubmit = (values) => {
    console.log("onGmaProfileSubmit", values)
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveGmaUser(values))
  }

  onParentProfileSubmit = (values) => {
    console.log("onParentProfileSubmit", values)
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveParentUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    if(this.props.loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    } else {
      const {user, saving, saved, error} = this.props
      return (
        <div>
          {saved && 
            <Alert type="success" heading="Success" text="We have updated your profile." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={"Error updating your profile: "+error} />
          }
          {user.kind === "Admin" &&
            <AdminForm 
              heading="Edit My Profile"
              onSubmit={this.onAdminProfileSubmit} 
              handleFile={this.handleFile} 
              saving={this.props.saving} 
              profilePhotoUrl={this.props.profilePhotoUrl}
              initialValues={user} 
            />
          }
          {user.kind === "Gma" &&
            <GmaForm 
              heading="Edit My Profile"
              onSubmit={this.onGmaProfileSubmit} 
              handleFile={this.handleFile} 
              saving={saving} 
              profilePhotoUrl={this.props.profilePhotoUrl}
              initialValues={user}
            />
          }
          {user.kind === "Parent" &&
            <ParentForm 
              heading="Edit My Profile"
              onSubmit={this.onParentProfileSubmit} 
              handleFile={this.handleFile} 
              saving={saving} 
              profilePhotoUrl={this.props.profilePhotoUrl}
              initialValues={user}
            />
          }
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { auth, saveAdmin, saveGma, saveParent } = state
  return {
    user: auth.user,
    authCookie: auth.cookie,
    loading: auth.loading,
    saving: saveAdmin.saving || saveGma.saving || saveParent.saving,
    error: saveAdmin.error || saveGma.error || saveParent.error,
    saved: saveAdmin.saved || saveGma.saved || saveParent.saved
  }
}

export default connect(mapStateToProps)(ProfileContainer)
