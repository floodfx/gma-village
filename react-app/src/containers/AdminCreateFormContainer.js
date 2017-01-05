import React, { Component } from 'react';
import AdminForm from '../components/AdminForm';
import AdminProfile from '../components/AdminProfile';
import { connect } from 'react-redux';
import  { fetchAuthCookie }  from '../actions/Auth';
import  { saveAdminUser }  from '../actions/AdminCreateFormContainer';
import  { uploadImage }  from '../actions/UploadImage';
import { Link } from 'react-router';


class AdminCreateFormContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAuthCookie())
  }

  handleSubmit = (values) => {    
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.dispatch(saveAdminUser(values))
  }

  handleFile = (e) => {
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    const {saving, saved, admin} = this.props;
    if(saved) {
      return (
        <div>
          <h2 className="lh-title fw2 f2">Create an Admin User</h2>
          <h3 className="lh-title fw4 f3">Successfully Created Admin User</h3>
          <AdminProfile admin={admin} />
          <div>
            Maybe you want to <Link to="/admin/list">View All Admins</Link> or 
            go back <Link to="/home">Home</Link>
          </div>
        </div>
      )
    } else {
      return <AdminForm 
                onSubmit={this.handleSubmit} 
                handleFile={this.handleFile} 
                saving={this.props.saving} 
                profilePhotoUrl={this.props.profilePhotoUrl}/>;
    }
  }
}

AdminCreateFormContainer.defaultProps = {
  admin: undefined,
  saving: false,
  saved: false
};

const mapStateToProps = (state) => {
  const { createAdmin, uploadImage, auth } = state
  return {
    auth: auth.cookie,
    saving: createAdmin.saving,
    error: createAdmin.error,
    admin: createAdmin.admin,
    saved: createAdmin.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

export default connect(mapStateToProps)(AdminCreateFormContainer)
