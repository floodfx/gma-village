import React, { Component, PropTypes } from 'react';
import AdminList from '../components/AdminList'
import { connect } from 'react-redux'
import  { fetchAdmins }  from '../actions/AdminListContainer'

class AdminListContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchAdmins())
  }

  render() {
    return (
      <div>        
        <AdminList 
          admins={this.props.admins}
          loading={this.props.loading}
          error={this.props.error} />
      </div>
    );
  }
}

AdminListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  admins: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  const { adminList, auth } = state
  return {
    loading: adminList.loading,
    admins: adminList.admins,
    error: adminList.error,
    auth: auth.cookie
  }
}

export default connect(mapStateToProps)(AdminListContainer)
