import React, { Component } from 'react';
import ParentForm from '../components/ParentForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class ParentEditFormContainer extends Component {

  componentWillMount() {
    const parentId = this.props.params.parentId;
    this.props.fetchParent(parentId);
  }

  componentWillUnmount() {
    this.props.resetParentUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto; // remove profile photo from form (uploaded already)
    this.props.saveParentUser(values);
  }

  handleFile = (e) => {
    this.props.uploadImage(this.props.authCookie, e.target.files[0]);
  }

  render() {
    const {saving, saved, parent, error, loading, profilePhotoUrl} = this.props;
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
            profilePhotoUrl={profilePhotoUrl || parent.profilePhotoUrl}
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
    saving: saveParent.saving,
    error: saveParent.error,
    parent: parentProfile.parent,
    saved: saveParent.saved,
    profilePhotoUrl: uploadImage.image_url,
    loading: parentProfile.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ParentEditFormContainer)
