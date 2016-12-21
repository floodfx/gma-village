import React, { Component } from 'react';
import AdminForm from '../components/AdminForm'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import  { fetchAuthCookie }  from '../actions/Auth'
import  { saveAdminUser }  from '../actions/AdminCreateFormContainer'
import  { uploadImage }  from '../actions/UploadImage'
import { City } from 'gma-village-data-model'


class AdminCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  handleSubmit = (values) => {    
    console.log("handleSubmit", values)
    delete values.profilePhoto
    this.props.dispatch(saveAdminUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    return <AdminForm onSubmit={this.handleSubmit} handleFile={this.handleFile} saving={this.props.saving} profilePhotoUrl={this.props.profilePhotoUrl}/>;
  }
}

const mapStateToProps = (state) => {
  const { createAdmin, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: createAdmin.saving,
    error: createAdmin.error,
    admin: createAdmin.gma,
    saved: createAdmin.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

AdminCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(AdminCreateFormContainer)
