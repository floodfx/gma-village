import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { ActionCreators } from '../actions';

class GmaProfileContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    this.props.fetchGma(gmaId);
  }

  render() {
    const {loading, auth, error, gma} = this.props;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      return (
        <GmaProfile
          gma={gma}
          loading={loading}
          error={error}
          currentUser={auth.user}/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { auth, gmaProfile } = state
  return {
    loading: gmaProfile.loading,
    gma: gmaProfile.gma,
    error: gmaProfile.error,
    auth: auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GmaProfileContainer)
