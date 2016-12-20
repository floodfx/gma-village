import React, { Component } from 'react';
import GmaForm from '../components/GmaForm'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import  { fetchAuthCookie }  from '../actions/Auth'
import  { saveGmaUser }  from '../actions/GmaCreateFormContainer'
import  { uploadImage }  from '../actions/UploadImage'
import { City } from 'gma-village-data-model'


class GmaCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  handleSubmit = (values) => {
    var removeEmpty = (a, b) => {
      if(b) {
        return a.concat(b)
      }
    }
    values.profilePhotoUrl = this.props.profilePhotoUrl;
    values.city = City.OAKLAND.name
    values.availabilities = values.availabilities.reduce(removeEmpty, []);
    values.careAges = values.careAges.reduce(removeEmpty, []);
    values.careExperiences = values.careExperiences.reduce(removeEmpty, []);
    values.careLocations = values.careLocations.reduce(removeEmpty, []);
    values.careTrainings = values.careTrainings.reduce(removeEmpty, []);
    values.demeanors = values.demeanors.reduce(removeEmpty, []);
    console.log("handleSubmit", values)
    this.props.dispatch(saveGmaUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    return <GmaForm onSubmit={this.handleSubmit} handleFile={this.handleFile} saving={this.props.saving} profilePhotoUrl={this.props.profilePhotoUrl}/>;
  }
}

const mapStateToProps = (state) => {
  const { createGma, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: createGma.saving,
    error: createGma.error,
    gma: createGma.gma,
    profilePhotoUrl: uploadImage.image_url
  }
}

GmaCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(GmaCreateFormContainer)
