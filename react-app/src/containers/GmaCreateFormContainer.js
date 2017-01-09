import React, { Component } from 'react';
import GmaForm from '../components/GmaForm'
import { connect } from 'react-redux'
import  { fetchAuthCookie }  from '../actions/Auth'
import  { saveGmaUser, resetGmaUser }  from '../actions/GmaSave'
import  { uploadImage }  from '../actions/UploadImage'
import { City } from 'gma-village-data-model'
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';


class GmaCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  componentWillUnmount() {
    this.props.dispatch(resetGmaUser())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto
    this.props.dispatch(saveGmaUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
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
            <Alert type="success" heading="Success" text="Saved Gma." />
          }
          {error && 
            <Alert type="danger" heading="Error" text={error} />
          }
          <GmaForm 
            heading="Create Gma"
            onSubmit={this.handleSubmit} 
            handleFile={this.handleFile} 
            saving={saving} 
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={{}}
            />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { saveGma, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: saveGma.saving,
    error: saveGma.error,
    saved: saveGma.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

GmaCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(GmaCreateFormContainer)
