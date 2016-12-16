import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile'
import { connect } from 'react-redux'
import  { fetchGma }  from '../actions/GmaProfileContainer'


class GmaProfileContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    this.props.dispatch(fetchGma(this.props.auth, gmaId))
  }

  render() {
    return <GmaProfile gma={this.props.gma}
                       loading={this.props.loading}
                       error={this.props.error}/>;
  }
}

const mapStateToProps = (state) => {
  const { gmaProfile, auth } = state
  return {
    loading: gmaProfile.loading,
    gma: gmaProfile.gma,
    error: gmaProfile.error,
    auth: auth.cookie
  }
}

export default connect(mapStateToProps)(GmaProfileContainer)
