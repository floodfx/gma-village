import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHome from '../components/AdminHome';
import GmaHome from '../components/GmaHome';
import ParentHome from '../components/ParentHome';
import LoadingIndicator from '../components/LoadingIndicator';

class HomeContainer extends Component {

  render() {
    const {user} = this.props;
    if(this.props.loading) {
      return (
        <LoadingIndicator text="Loading" />
      )
    } else {
      return (
        <div>
          {user.kind === "Admin" &&
            <AdminHome user={user}/>
          }
          {user.kind === "Gma" &&
            <GmaHome user={user} />
          }
          {user.kind === "Parent" &&
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

export default connect(mapStateToProps)(HomeContainer)
