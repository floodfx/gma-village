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
        <div className="row">
          <div className="col-md-12 col-sm-8 gma-orange-border" style={{marginBottom: '10px'}}>
            <h3 className="gma-orange">Welcome!</h3>
            <p>
              We look forward to connecting you to our community of Gma's.
              Please select all the apply below to find a Gma that matches your needs.
            </p>
          </div>
        </div>        
        <div className="row">
          <AdminList admins={this.props.admins}
            loading={this.props.loading}
            error={this.props.error} />
        </div>
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
