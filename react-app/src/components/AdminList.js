import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import AdminProfile from './AdminProfile';

class AdminList extends Component {

  render() {
    const {loading, admins} = this.props;
    if (loading) {
      return (
        <div>
          <FontAwesome name='spinner' spin={true} className="mr1" />
          Loading... 
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="w-100 gma-orange-border cf">
          <Link className="btn fr gma-orange-bg mt4 mh4" to="/admin/create">Create Admin</Link>
            <h1 className="gma-orange pl4">Admins <span className="badge">{this.props.admins.length}</span></h1>            
            {admins.map((admin) => {
              return <AdminProfile key={admin.id} admin={admin} />
            })}
          </div>
        </div>
      );
    }
  }


}

AdminList.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AdminList
