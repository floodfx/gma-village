import React, { Component } from 'react';
import ParentForm from '../components/ParentForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class ParentCreateFormContainer extends Component {

  componentWillMount() {
    this.props.fetchAuthCookie();
  }

  componentWillUnmount() {
    this.props.resetParentUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto
    this.props.saveParentUser(values);
  }

  handleFile = (e) => {
    this.props.uploadImage(this.props.authCookie, e.target.files[0]);
  }

  render() {
    const {saving, saved, error, loading} = this.props;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      return (
        <div>
          {saved &&
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={error} />
          }
          <ParentForm
            heading="Create Parent"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profile_image_url={this.props.profile_image_url}
            initialValues={{
              user_type: "PARENT",
              active: false
            }}
          />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { saveParent, uploadImage, auth } = state
  return {
    authCookie: auth.cookie,
    saving: saveParent.saving,
    error: saveParent.error,
    saved: saveParent.saved,
    profile_image_url: uploadImage.image_url
  }
}

ParentCreateFormContainer.defaultProps = {
  loading: false
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ParentCreateFormContainer)
