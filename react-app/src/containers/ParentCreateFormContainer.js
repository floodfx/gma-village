import React, { Component } from 'react';
import ParentForm from '../components/ParentForm';
import  { fetchAuthCookie }  from '../actions/Auth';
import { connect } from 'react-redux';
import  { saveParentUser, resetParentUser }  from '../actions/ParentSave';
import  { uploadImage, resetUploadImage }  from '../actions/UploadImage';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

class ParentCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  componentWillUnmount() {
    this.props.dispatch(resetParentUser())
    this.props.dispatch(resetUploadImage())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto
    const { dispatch, graphQLClient } = this.props;
    dispatch(saveParentUser(graphQLClient, values));
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.authCookie, e.target.files[0]))
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
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
          {error && 
            <Alert type="danger" heading="Error" text={error} />
          }
          <ParentForm 
            heading="Create Parent"
            onSubmit={this.handleSubmit} 
            handleFile={this.handleFile} 
            saving={saving} 
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={{
              kind: "Parent",
              active: false
            }}
          />
          {saved && 
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { saveParent, uploadImage, auth } = state
  return {
    authCookie: auth.cookie,
    saving: saveParent.saving,
    error: saveParent.error,
    saved: saveParent.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

ParentCreateFormContainer.defaultProps = {
  loading: false
};

export default injectGraphQLClient(connect(mapStateToProps)(ParentCreateFormContainer));
