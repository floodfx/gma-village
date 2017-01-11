import React, { Component, PropTypes } from 'react';
import AdminList from '../components/AdminList';
import { connect } from 'react-redux';
import  { fetchAdmins }  from '../actions/AdminListContainer';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

class AdminListContainer extends Component {

  componentWillMount() {
    const { dispatch, graphQLClient } = this.props;
    dispatch(fetchAdmins(graphQLClient));
  }

  render() {
    return (
      <div>        
        <AdminList 
          admins={this.props.admins}
          loading={this.props.loading}
          error={this.props.error}
          currentUser={this.props.auth.user} />
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
    auth: auth
  }
}

export default injectGraphQLClient(connect(mapStateToProps)(AdminListContainer));
