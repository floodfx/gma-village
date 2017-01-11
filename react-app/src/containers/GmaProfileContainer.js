import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile';
import { connect } from 'react-redux';
import  { fetchGma }  from '../actions/GmaProfile';
import LoadingIndicator from '../components/LoadingIndicator';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

class GmaProfileContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    const { dispatch, graphQLClient } = this.props;
    dispatch(fetchGma(graphQLClient, gmaId));
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

export default injectGraphQLClient(connect(mapStateToProps)(GmaProfileContainer));
