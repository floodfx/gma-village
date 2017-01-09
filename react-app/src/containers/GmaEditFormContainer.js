import React, { Component } from 'react';
import GmaForm from '../components/GmaForm';
import { connect } from 'react-redux';
import  { fetchGma }  from '../actions/GmaProfile';
import  { saveGmaUser, resetGmaUser }  from '../actions/GmaSave';
import  { uploadImage }  from '../actions/UploadImage';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';


class GmaEditFormContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    this.props.dispatch(fetchGma(gmaId))
  }

  componentWillUnmount() {
    this.props.dispatch(resetGmaUser())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveGmaUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    const {saving, saved, gma, error, loading} = this.props;
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
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={gma}
            />
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
  const { gmaProfile, saveGma, uploadImage } = state
  return {
    saving: saveGma.saving,
    error: saveGma.error,
    gma: gmaProfile.gma,
    saved: saveGma.saved,
    profilePhotoUrl: uploadImage.image_url,
    loading: gmaProfile.loading,
  }
}

export default connect(mapStateToProps)(GmaEditFormContainer)
