import React, { Component, PropTypes } from 'react';
import AdminList from '../components/AdminList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class AdminListContainer extends Component {

  componentWillMount() {
    this.props.fetchAdmins();
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminListContainer)
