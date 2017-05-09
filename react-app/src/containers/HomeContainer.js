import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminHome from '../components/AdminHome';
import GmaHome from '../components/GmaHome';
import ParentHome from '../components/ParentHome';
import LoadingIndicator from '../components/LoadingIndicator';
import { ActionCreators } from '../actions';

class HomeContainer extends Component {

  render() {
    const { user } = this.props;
    console.log("user", user)
    if(this.props.loading) {
      return (
        <LoadingIndicator text="Loading" />
      )
    } else {
      return (
        <div>
          {user.user_type === "ADMIN" &&
            <AdminHome user={user}/>
          }
          {user.user_type === "GMA" &&
            <GmaHome user={user} />
          }
          {user.user_type === "PARENT" &&
            <ParentHome user={user} />
          }
        </div>
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    user: auth.user,
    loading: auth.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
