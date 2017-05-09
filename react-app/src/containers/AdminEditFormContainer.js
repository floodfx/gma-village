import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class AdminEditFormContainer extends Component {

  componentWillMount() {
    const adminId = this.props.params.adminId;
    this.props.fetchAdmin(adminId);
  }

  componentWillUnmount() {
    this.props.resetAdminUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveAdminUser(values);
  }

  handleFile = (e) => {
    this.props.uploadImage(this.props.authCookie, e.target.files[0]);
  }

  render() {
    const {saving, saved, admin, error, loading, profilePhotoUrl} = this.props;
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
            profilePhotoUrl={profilePhotoUrl || admin.profilePhotoUrl}
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
    saving: saveAdmin.saving,
    error: saveAdmin.error,
    admin: adminProfile.admin,
    saved: saveAdmin.saved,
    profilePhotoUrl: uploadImage.image_url,
    loading: adminProfile.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditFormContainer)
