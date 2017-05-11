import React, { Component } from 'react';
import ParentForm from '../components/ParentForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class ParentEditFormContainer extends Component {

  componentWillMount() {
    const { authCookie, params } = this.props;
    this.props.fetchParent(authCookie.account_kit_access_token, params.parentId);
  }

  componentWillUnmount() {
    this.props.resetParentUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveParentUser(this.props.authCookie.account_kit_access_token, values);
  }

  handleFile = (e) => {
    this.props.preUploadImageRequest(e.target.files[0]);
  }

  render() {
    const {saving, saved, parent, error, loading, profile_image_url} = this.props;
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
            heading="Edit Parent"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profile_image_url={profile_image_url || parent.profile_image_url}
            profile_image_loading={this.props.profile_image_loading}
            initialValues={parent}
            />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Parent." />
          }
        </div>
      )
    }
  }
}

ParentEditFormContainer.defaultProps = {
  saving: false,
  saved: false,
  loading: true,
};

const mapStateToProps = (state) => {
  const { auth, parentProfile, saveParent, uploadImage } = state
  return {
    authCookie: auth.cookie,
    loading: parentProfile.loading,
    saving: saveParent.saving,
    error: saveParent.error,
    parent: parentProfile.parent,
    saved: saveParent.saved,
    signed_url: uploadImage.signed_url,
    profile_image_url: uploadImage.image_url,
    profile_image_loading: uploadImage.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ParentEditFormContainer)
