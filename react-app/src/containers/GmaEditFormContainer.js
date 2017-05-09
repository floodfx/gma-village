import React, { Component } from 'react';
import GmaForm from '../components/GmaForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class GmaEditFormContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    this.props.fetchGma(gmaId);
  }

  componentWillUnmount() {
    this.props.resetGmaUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient } = this.props;
    this.props.saveGmaUser(values);
  }

  handleFile = (e) => {
    this.props.uploadImage(this.props.authCookie, e.target.files[0]);
  }

  render() {
    const {saving, saved, gma, error, loading, currentUser, profilePhotoUrl} = this.props;
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
            profilePhotoUrl={profilePhotoUrl || gma.profilePhotoUrl}
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
    saving: saveGma.saving,
    error: saveGma.error,
    gma: gmaProfile.gma,
    saved: saveGma.saved,
    profilePhotoUrl: uploadImage.image_url,
    loading: gmaProfile.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GmaEditFormContainer)
