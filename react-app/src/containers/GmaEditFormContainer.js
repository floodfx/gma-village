import React, { Component } from 'react';
import GmaForm from '../components/GmaForm';
import { connect } from 'react-redux';
import  { fetchGma }  from '../actions/GmaProfile';
import  { saveGmaUser, resetGmaUser }  from '../actions/GmaSave';
import  { uploadImage, resetUploadImage }  from '../actions/UploadImage';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

class GmaEditFormContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    const { dispatch, graphQLClient } = this.props;
    dispatch(fetchGma(graphQLClient, gmaId));
  }

  componentWillUnmount() {
    this.props.dispatch(resetGmaUser())
    this.props.dispatch(resetUploadImage())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient } = this.props;
    dispatch(saveGmaUser(graphQLClient, values));
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.authCookie, e.target.files[0]))
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

export default injectGraphQLClient(connect(mapStateToProps)(GmaEditFormContainer));
