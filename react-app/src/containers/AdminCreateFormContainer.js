import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    const image = e.target.files[0];
    window.loadImage(
      image, (canvas) => {
        if(canvas.type === "error") {
          console.log("Error loading image", image);
        } else {
          canvas.toBlob(
            (blob) => {
              this.props.preUploadImageRequest(blob);
            },
            image.type
          );
        }
      },
      {orientation: true}
    )
  }

  render() {
    const {saving, saved, error, loading, profile_image_url} = this.props;
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
            profile_image_url={profile_image_url}
            profile_image_loading={this.props.profile_image_loading}
            initialValues={{
              active: false,
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
    signed_url: uploadImage.signed_url,
    profile_image_url: uploadImage.image_url,
    profile_image_loading: uploadImage.loading
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCreateFormContainer)
