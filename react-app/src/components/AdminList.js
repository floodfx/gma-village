import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AdminProfile from './AdminProfile';
import LoadingIndicator from './LoadingIndicator';

class AdminList extends Component {

  render() {
    const {loading, admins, currentUser} = this.props;
    if (loading) {
      return (
        <LoadingIndicator text="Loading..." />
      )
    }
    else {
      return (
        <div>
          <div className="w-100 gma-orange-border cf">
          <Link className="btn fr gma-orange-bg mt4 mh4" to="/admin/create">Create Admin</Link>
            <h1 className="gma-orange pl4">Admins <span className="badge">{this.props.admins.length}</span></h1>            
            {admins.map((admin) => {
              return <AdminProfile key={admin.id} admin={admin} isSelf={currentUser.id === admin.id} />
            })}
          </div>
        </div>
      );
    }
  }


}

AdminList.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default AdminList
