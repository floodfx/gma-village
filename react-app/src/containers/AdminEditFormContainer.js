import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class AdminEditFormContainer extends Component {

  componentWillMount() {
    const { authCookie, params } = this.props;
    this.props.fetchAdmin(authCookie.account_kit_access_token, params.adminId);
  }

  componentWillUnmount() {
    this.props.resetAdminUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    const { authCookie } = this.props;
    this.props.saveAdminUser(authCookie.account_kit_access_token, values);
  }

  handleFile = (e) => {
    this.props.preUploadImageRequest(e.target.files[0]);
  }

  render() {
    const {saving, saved, admin, error, loading, profile_image_url} = this.props;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      return (
        <div>
          {saved &&
            <Alert type="success" heading="Success" text="Saved Admin." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={error} />
          }
          <AdminForm
            heading="Edit Admin"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profile_image_url={profile_image_url || admin.profile_image_url}
            profile_image_loading={this.props.profile_image_loading}
            initialValues={admin}
            />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Admin." />
          }
        </div>
      )
    }
  }
}

AdminEditFormContainer.defaultProps = {
  admin: undefined,
  saving: false,
  saved: false,
  loading: true,
};

const mapStateToProps = (state) => {
  const { auth, adminProfile, saveAdmin, uploadImage } = state
  return {
    authCookie: auth.cookie,
    loading: adminProfile.loading,
    saving: saveAdmin.saving,
    error: saveAdmin.error,
    admin: adminProfile.admin,
    saved: saveAdmin.saved,
    signed_url: uploadImage.signed_url,
    profile_image_url: uploadImage.image_url,
    profile_image_loading: uploadImage.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditFormContainer)
