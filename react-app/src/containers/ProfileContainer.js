import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminForm from '../components/AdminForm';
import GmaForm from '../components/GmaForm';
import ParentForm from '../components/ParentForm';
import  { saveAdminUser, resetAdminUser }  from '../actions/AdminSave';
import  { saveGmaUser, resetGmaUser }  from '../actions/GmaSave';
import  { saveParentUser, resetParentUser }  from '../actions/ParentSave';
import  { currentUser }  from '../actions/Auth';
import  { uploadImage }  from '../actions/UploadImage';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

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
      const { dispatch, graphQLClient } = this.props;
      dispatch(currentUser(graphQLClient, this.props.authCookie));
    }
  }

  onAdminProfileSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient } = this.props;
    dispatch(saveAdminUser(graphQLClient, values));
  }

  onGmaProfileSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient } = this.props;
    dispatch(saveGmaUser(graphQLClient, values));
  }

  onParentProfileSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient } = this.props;
    dispatch(saveParentUser(graphQLClient, values));
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.authCookie, e.target.files[0]))
  }

  render() {
    if(this.props.loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    } else {
      const {user, saving, saved, error, profilePhotoUrl} = this.props
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
              profilePhotoUrl={profilePhotoUrl || user.profilePhotoUrl}
              initialValues={user} 
            />
          }
          {user.kind === "Gma" &&
            <GmaForm 
              heading="Edit My Profile"
              onSubmit={this.onGmaProfileSubmit} 
              handleFile={this.handleFile} 
              saving={saving} 
              currentUser={user}
              profilePhotoUrl={profilePhotoUrl || user.profilePhotoUrl}
              initialValues={user}
            />
          }
          {user.kind === "Parent" &&
            <ParentForm 
              heading="Edit My Profile"
              onSubmit={this.onParentProfileSubmit} 
              handleFile={this.handleFile} 
              saving={saving} 
              profilePhotoUrl={profilePhotoUrl || user.profilePhotoUrl}
              initialValues={user}
              currentUser={user}
            />
          }
          {saved && 
            <Alert type="success" heading="Success" text="We have updated your profile." />
          }
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { auth, saveAdmin, saveGma, saveParent, uploadImage } = state
  return {
    user: auth.user,
    authCookie: auth.cookie,
    loading: auth.loading,
    saving: saveAdmin.saving || saveGma.saving || saveParent.saving,
    error: saveAdmin.error || saveGma.error || saveParent.error,
    saved: saveAdmin.saved || saveGma.saved || saveParent.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

export default injectGraphQLClient(connect(mapStateToProps)(ProfileContainer));
