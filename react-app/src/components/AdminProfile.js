import React, { Component, PropTypes } from 'react';

class AdminProfile extends Component {

  render() {
    const { admin } = this.props;
    return (
      <div className="fl w-100 w-25-ns pa2">

        <div className="thumbnail">
          {admin.profilePhotoUrl &&
            <img className="img-rounded img-responsive gma-orange-border" style={{ objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px' }} src={admin.profilePhotoUrl} alt="profile photo" />
          }
          <div className="">
            <h3 className="gma-orange tc gma-font fw3">{admin.first_name} {admin.last_name}</h3>
            <h4 className="tc fw4">
              Phone: {admin.phone} 
            </h4>
            <h4 className="tc fw4">
              Status: {admin.active ? "Active" : "Not Active"} 
            </h4>            
          </div>
        </div>
      </div>
    )
  }

}

AdminProfile.propTypes = {
  admin: PropTypes.object.isRequired
};

export default AdminProfile;