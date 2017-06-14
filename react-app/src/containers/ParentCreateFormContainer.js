import React, { Component } from 'react';
import ParentForm from '../components/ParentForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class ParentCreateFormContainer extends Component {

  componentWillMount() {
    this.props.fetchAuthCookie();
  }

  componentWillUnmount() {
    this.props.resetParentUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto
    this.props.saveParentUser(this.props.authCookie.account_kit_access_token, values);
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
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={error} />
          }
          <ParentForm
            heading="Create Parent"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profile_image_url={profile_image_url}
            profile_image_loading={this.props.profile_image_loading}
            initialValues={{
              user_type: "PARENT",
              active: false
            }}
          />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { saveParent, uploadImage, auth } = state
  return {
    authCookie: auth.cookie,
    saving: saveParent.saving,
    error: saveParent.error,
    saved: saveParent.saved,
    signed_url: uploadImage.signed_url,
    profile_image_url: uploadImage.image_url,
    profile_image_loading: uploadImage.loading
  }
}

ParentCreateFormContainer.defaultProps = {
  loading: false
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ParentCreateFormContainer)
