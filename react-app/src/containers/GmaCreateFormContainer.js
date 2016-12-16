import React, { Component } from 'react';
import GmaForm from '../components/GmaForm'
import Loading from '../components/Loading'
import { connect } from 'react-redux'
import  { uploadImage }  from '../actions/UploadImage'


class GmaCreateFormContainer extends Component {

  handleSubmit = (values) => {
    console.log("handleSubmit", values)
  }

  handleFile = (e) => {
    console.log("handleFile", e)
    console.log("handleFile", e.target.files[0])
    this.props.dispatch(uploadImage(this.props.auth, e.target.files[0]))
  }

  render() {
    const {loading} = this.props;
    if(loading) {
      return <Loading loading={loading} />
    } else {
      return <GmaForm onSubmit={this.handleSubmit} handleFile={this.handleFile}/>;
    }
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  return {
    auth: auth.cookie
  }
}

GmaCreateFormContainer.defaultProps = {
  loading: false
};

export default connect(mapStateToProps)(GmaCreateFormContainer)
