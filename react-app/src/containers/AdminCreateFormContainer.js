import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Role } from 'gma-village-data-model';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class AdminCreateFormContainer extends Component {

  componentWillMount() {
    this.props.fetchAuthCookie();
  }

  componentWillUnmount() {
    this.props.resetAdminUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveAdminUser(this.props.authCookie.account_kit_access_token, values);
  }

  handleFile = (e) => {
    this.props.uploadImage(this.props.authCookie, e.target.files[0]);
  }

  render() {
    const {saving, saved, error, loading} = this.props;
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
            heading="Create Admin"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profile_image_url={this.props.profile_image_url}
            initialValues={{
              active: false,
              roles: [Role.ADMIN.name],
              user_type: "ADMIN"
            }}
          />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Admin." />
          }
        </div>
      )
    }
  }
}

AdminCreateFormContainer.defaultProps = {
  saving: false,
  saved: false
};

const mapStateToProps = (state) => {
  const { saveAdmin, uploadImage, auth } = state
  return {
    authCookie: auth.cookie,
    saving: saveAdmin.saving,
    error: saveAdmin.error,
    saved: saveAdmin.saved,
    profile_image_url: uploadImage.image_url
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCreateFormContainer)
