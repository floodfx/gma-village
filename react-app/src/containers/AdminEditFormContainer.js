import React, { Component, PropTypes } from 'react';
import AdminForm from '../components/AdminForm';
import AdminProfile from '../components/AdminProfile';
import { connect } from 'react-redux';
import  { fetchAdmin }  from '../actions/AdminProfile';
import  { saveAdminUser, resetAdminUser }  from '../actions/AdminSave';
import  { uploadImage }  from '../actions/UploadImage';
import { Link } from 'react-router';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';


class AdminEditFormContainer extends Component {

  componentWillMount() {
    const adminId = this.props.params.adminId;
    this.props.dispatch(fetchAdmin(adminId))
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
            heading="Edit Admin"
            onSubmit={this.handleSubmit} 
            handleFile={this.handleFile} 
            saving={this.props.saving} 
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={admin}
            />
        </div>
      )
    }
  }
}

AdminEditFormContainer.defaultProps = {
  admin: undefined,
  saving: false,
  saved: false,
  loading: true,
};

const mapStateToProps = (state) => {
  const { adminProfile, saveAdmin, uploadImage } = state
  return {
    saving: saveAdmin.saving,
    error: saveAdmin.error,
    admin: adminProfile.admin,
    saved: saveAdmin.saved,
    profilePhotoUrl: uploadImage.image_url,
    loading: adminProfile.loading,
  }
}

export default connect(mapStateToProps)(AdminEditFormContainer)
