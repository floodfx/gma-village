import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminForm from '../components/AdminForm';
import GmaForm from '../components/GmaForm';
import ParentForm from '../components/ParentForm';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class ProfileContainer extends Component {

  componentWillUnmount() {
    const { user } = this.props;
    if(user.user_type === "ADMIN") {
      this.props.resetAdminUser();
    } else if(user.user_type === "GMA") {
      this.props.resetGmaUser();
    } else if(user.user_type === "PARENT") {
      this.props.resetParentUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    // refresh current user after profile save
    if(!this.props.saved && nextProps.saved) {
      this.props.currentUser(this.props.authCookie.account_kit_access_token);
    }
  }

  onAdminProfileSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveAdminUser(this.props.authCookie.account_kit_access_token, values);
  }

  onGmaProfileSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveGmaUser(this.props.authCookie.account_kit_access_token, values);
  }

  onParentProfileSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveParentUser(this.props.authCookie.account_kit_access_token, values);
  }

  handleFile = (e) => {
    this.props.preUploadImageRequest(e.target.files[0]);
  }

  render() {
    if(this.props.loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    } else {
      const {user, saving, saved, error, profile_image_url} = this.props
      return (
        <div>
          {saved &&
            <Alert type="success" heading="Success" text="We have updated your profile." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={"Error updating your profile: "+error} />
          }
          {user.user_type === "ADMIN" &&
            <AdminForm
              heading="Edit My Profile"
              onSubmit={this.onAdminProfileSubmit}
              handleFile={this.handleFile}
              saving={this.props.saving}
              profile_image_url={profile_image_url || user.profile_image_url}
              profile_image_loading={this.props.profile_image_loading}
              initialValues={user}
            />
          }
          {user.user_type === "GMA" &&
            <GmaForm
              heading="Edit My Profile"
              onSubmit={this.onGmaProfileSubmit}
              handleFile={this.handleFile}
              saving={saving}
              currentUser={user}
              profile_image_url={profile_image_url || user.profile_image_url}
              initialValues={user}
            />
          }
          {user.user_type === "PARENT" &&
            <ParentForm
              heading="Edit My Profile"
              onSubmit={this.onParentProfileSubmit}
              handleFile={this.handleFile}
              saving={saving}
              profile_image_url={profile_image_url || user.profile_image_url}
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
    signed_url: uploadImage.signed_url,
    profile_image_url: uploadImage.image_url,
    profile_image_loading: uploadImage.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
