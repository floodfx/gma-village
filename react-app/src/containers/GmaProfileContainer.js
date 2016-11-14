import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile'
import { connect } from 'react-redux'
import  { fetchGma }  from '../actions/GmaProfileContainer'


class GmaProfileContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    console.log("gmaId", gmaId)
    this.props.dispatch(fetchGma(gmaId))
  }

  render() {
    return <GmaProfile gma={this.props.gma} />;
  }
}

const mapStateToProps = (state) => {
  const { gmaProfile } = state
  return {
    loading: gmaProfile.loading,
    gma: gmaProfile.gma,
    error: gmaProfile.error
  }
}

export default connect(mapStateToProps)(GmaProfileContainer)
