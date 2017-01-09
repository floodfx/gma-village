import React, { Component, PropTypes } from 'react';
import ParentForm from '../components/ParentForm';
import ParentProfile from '../components/ParentProfile';
import { connect } from 'react-redux';
import  { fetchParent }  from '../actions/ParentProfile';
import  { saveParentUser, resetParentUser }  from '../actions/ParentSave';
import  { uploadImage }  from '../actions/UploadImage';
import { Link } from 'react-router';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';


class ParentEditFormContainer extends Component {

  componentWillMount() {
    const parentId = this.props.params.parentId;
    this.props.dispatch(fetchParent(parentId))
  }

  componentWillUnmount() {
    this.props.dispatch(resetParentUser())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveParentUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    const {saving, saved, parent, error, loading} = this.props;
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
            heading="Edit Parent"
            onSubmit={this.handleSubmit} 
            handleFile={this.handleFile} 
            saving={saving} 
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={parent}
            />
        </div>
      )
    }
  }
}

ParentEditFormContainer.defaultProps = {
  saving: false,
  saved: false,
  loading: true,
};

const mapStateToProps = (state) => {
  const { parentProfile, saveParent, uploadImage } = state
  return {
    saving: saveParent.saving,
    error: saveParent.error,
    parent: parentProfile.parent,
    saved: saveParent.saved,
    profilePhotoUrl: uploadImage.image_url,
    loading: parentProfile.loading,
  }
}

export default connect(mapStateToProps)(ParentEditFormContainer)
