import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import { connect } from 'react-redux';
import  { fetchAuthCookie }  from '../actions/Auth';
import  { saveAdminUser, resetAdminUser }  from '../actions/AdminSave';
import  { uploadImage }  from '../actions/UploadImage';
import { Role } from 'gma-village-data-model';
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
    const {saving, saved, error, loading} = this.props;
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
            saving={saving} 
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={{
              active: false,
              roles: [Role.ADMIN.name],
              kind: "Admin"
            }}
          />
        </div>
      )
    }
  }
}

AdminCreateFormContainer.defaultProps = {
  saving: false,
  saved: false
};

const mapStateToProps = (state) => {
  const { saveAdmin, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: saveAdmin.saving,
    error: saveAdmin.error,
    saved: saveAdmin.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

export default connect(mapStateToProps)(AdminCreateFormContainer)
