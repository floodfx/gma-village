import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile';
import LoadingIndicator from '../components/LoadingIndicator';
import { connect } from 'react-redux';
import  { fetchGma }  from '../actions/GmaProfile';


class GmaProfileFormContainer extends Component {

  componentWillMount() {
    const gmaId = this.props.params.gmaId;
    this.props.dispatch(fetchGma(gmaId))
  }

  componentWillReceiveProps(newProps) {
    console.log("newProps", newProps)
  }

  handleSubmit = (values) => {
    console.log(values)
  }

  render() {
    if(loading) {
      return <LoadingIndicator text="Loading..." />
    } else {
      return <GmaProfileForm onSubmit={this.handleSubmit} initialValues={this.props.gma}/>;
    }
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

export default connect(mapStateToProps)(GmaProfileFormContainer)
