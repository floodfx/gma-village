import React, { Component } from 'react';
import GmaForm from '../components/GmaForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class GmaEditFormContainer extends Component {

  componentWillMount() {
    const { authCookie, params } = this.props;
    this.props.fetchGma(authCookie.account_kit_access_token, params.gmaId);
  }

  componentWillUnmount() {
    this.props.resetGmaUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveGmaUser(this.props.authCookie.account_kit_access_token, values);
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
    const {saving, saved, gma, error, loading, currentUser, profile_image_url} = this.props;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      return (
        <div>
          {saved &&
            <Alert type="success" heading="Success" text="Saved Gma." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={error} />
          }
          <GmaForm
            heading="Edit Gma"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profile_image_url={profile_image_url || gma.profile_image_url}
            profile_image_loading={this.props.profile_image_loading}
            initialValues={gma}
            currentUser={currentUser}
            />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Gma." />
          }
        </div>
      )
    }
  }
}

GmaEditFormContainer.defaultProps = {
  gma: undefined,
  saving: false,
  saved: false,
  loading: true,
};

const mapStateToProps = (state) => {
  const { auth, gmaProfile, saveGma, uploadImage } = state
  return {
    authCookie: auth.cookie,
    currentUser: auth.user,
    loading: gmaProfile.loading,
    saving: saveGma.saving,
    error: saveGma.error,
    gma: gmaProfile.gma,
    saved: saveGma.saved,
    signed_url: uploadImage.signed_url,
    profile_image_url: uploadImage.image_url,
    profile_image_loading: uploadImage.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GmaEditFormContainer)
