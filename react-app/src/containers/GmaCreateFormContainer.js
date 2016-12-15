import React, { Component } from 'react';
import GmaForm from '../components/GmaForm'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import  { fetchGma }  from '../actions/GmaProfileContainer'


class GmaCreateFormContainer extends Component {

  handleSubmit = (values) => {
    console.log("handleSubmit", values)
  }

  render() {
    const {loading} = this.props;
    if(loading) {
      return <Loading loading={loading} />
    } else {
      return <GmaForm onSubmit={this.handleSubmit}/>;
    }
  }
}

const mapStateToProps = (state) => {
  const { gmaProfile } = state
  return { }
}

GmaCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(GmaCreateFormContainer)
