import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import AdminProfile from '../components/AdminProfile';
import { connect } from 'react-redux';
import  { fetchAuthCookie }  from '../actions/Auth';
import  { saveAdminUser, resetAdminUser }  from '../actions/AdminSave';
import  { uploadImage }  from '../actions/UploadImage';
import { Link } from 'react-router';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';


class AdminCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  componentWillUnmount() {
    this.props.dispatch(resetAdminUser())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveAdminUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    const {saving, saved, admin, error, loading} = this.props;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      return (
        <div>
          {saved && 
            <Alert type="success" heading="Success" text="Saved Admin." />
          }
          {error && 
            <Alert type="danger" heading="Error" text={error} />
          }
          <AdminForm 
            heading="Create Admin"
            onSubmit={this.handleSubmit} 
            handleFile={this.handleFile} 
            saving={this.props.saving} 
            profilePhotoUrl={this.props.profilePhotoUrl}
            admin={admin}
            />
        </div>
      )
    }
  }
}

AdminCreateFormContainer.defaultProps = {
  admin: undefined,
  saving: false,
  saved: false
};

const mapStateToProps = (state) => {
  const { saveAdmin, uploadImage, auth } = state
  console.log("saveAdmin", saveAdmin)
  return {
    auth: auth.cookie,
    saving: saveAdmin.saving,
    error: saveAdmin.error,
    admin: saveAdmin.admin,
    saved: saveAdmin.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

export default connect(mapStateToProps)(AdminCreateFormContainer)
