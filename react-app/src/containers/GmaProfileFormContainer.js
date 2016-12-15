import React, { Component } from 'react';
import GmaProfile from '../components/GmaProfile'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import  { fetchGma }  from '../actions/GmaProfileContainer'


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
      return <Loading loading={loading} />
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
