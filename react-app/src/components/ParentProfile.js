import React, { Component, PropTypes } from 'react';

class ParentProfile extends Component {

  render() {
    const { parent } = this.props;
    return (
      <div className="fl w-100 w-25-ns pa2">

        <div className="thumbnail">
          {parent.profilePhotoUrl &&
            <img className="img-rounded img-responsive gma-orange-border" style={{ objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px' }} src={parent.profilePhotoUrl} alt="profile photo" />
          }
          <div className="">
            <h3 className="gma-orange tc gma-font fw3">{parent.first_name} {parent.last_name}</h3>
            <h4 className="tc fw4">
              Phone: {parent.phone} 
            </h4>
            <h4 className="tc fw4">
              Status: {parent.active ? "Active" : "Not Active"} 
            </h4>            
          </div>
        </div>
      </div>
    )
  }

}

ParentProfile.propTypes = {
  parent: PropTypes.object.isRequired
};

export default ParentProfile;