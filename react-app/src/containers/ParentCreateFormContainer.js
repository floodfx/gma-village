import React, { Component } from 'react';
import ParentForm from '../components/ParentForm';
import  { fetchAuthCookie }  from '../actions/Auth';
import { connect } from 'react-redux';
import  { saveParentUser }  from '../actions/ParentSave';
import  { uploadImage }  from '../actions/UploadImage';

class ParentCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  handleSubmit = (values) => {    
    console.log("handleSubmit", values)
    delete values.profilePhoto
    this.props.dispatch(saveParentUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    return <ParentForm onSubmit={this.handleSubmit} handleFile={this.handleFile} saving={this.props.saving} profilePhotoUrl={this.props.profilePhotoUrl}/>;
  }
}

const mapStateToProps = (state) => {
  const { saveParent, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: saveParent.saving,
    error: saveParent.error,
    parent: saveParent.parent,
    saved: saveParent.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

ParentCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(ParentCreateFormContainer)
