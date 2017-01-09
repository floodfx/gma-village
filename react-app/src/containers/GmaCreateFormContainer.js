import React, { Component } from 'react';
import GmaForm from '../components/GmaForm'
import { connect } from 'react-redux'
import  { fetchAuthCookie }  from '../actions/Auth'
import  { saveGmaUser }  from '../actions/GmaSave'
import  { uploadImage }  from '../actions/UploadImage'
import { City } from 'gma-village-data-model'


class GmaCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  handleSubmit = (values) => {    
    console.log("handleSubmit", values)
    delete values.profilePhoto
    this.props.dispatch(saveGmaUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    return (
      <GmaForm 
        heading="Create Gma"
        onSubmit={this.handleSubmit} 
        handleFile={this.handleFile} 
        saving={this.props.saving} 
        profilePhotoUrl={this.props.profilePhotoUrl}
        />
    )
  }
}

const mapStateToProps = (state) => {
  const { saveGma, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: saveGma.saving,
    error: saveGma.error,
    gma: saveGma.gma,
    saved: saveGma.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

GmaCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(GmaCreateFormContainer)
