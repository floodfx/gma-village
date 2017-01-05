import React, { Component } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

class AdminList extends Component {

  render() {
    if (this.props.loading) {
      return <div>
               <FontAwesome name='spinner' spin={true} className="mr1" />
               Loading... 
             </div>
    }
    else {
      return (
        <div>
          <div className="col-md-12 col-sm-8 gma-orange-border">
            <h1 className="gma-orange">Admins <span className="badge">{this.props.admins.length}</span></h1>
            {this.props.admins.map(this.renderProfileThumbnail)}
          </div>
        </div>
      );
    }
  }

  renderProfileThumbnail = (admin) => {
    return (
      <div key={admin.id} className="col-sm-6 col-md-3" style={{ minHeight: "575px" }}>
        <div className="thumbnail">
          {admin.profilePhotoUrl &&
            <img className="img-rounded img-responsive gma-orange-border" style={{ objectFit: 'cover', maxWidth: '135px', maxHeight: '135px', minWidth: '135px', minHeight: '135px' }} src={admin.profilePhotoUrl} alt="profile photo" />
          }

          <div className="caption">
            <h3 className="gma-orange text-center gma-font">Admin {admin.first_name}</h3>
          </div>
        </div>
      </div>
    )
  }


}

export default AdminList
