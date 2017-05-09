import React, { Component } from 'react';
import GmaForm from '../components/GmaForm'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { City } from 'gma-village-data-model';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';

class GmaCreateFormContainer extends Component {

  componentWillMount() {
    this.props.fetchAuthCookie();
  }

  componentWillUnmount() {
    this.props.resetGmaUser();
    this.props.resetUploadImage();
  }

  handleSubmit = (values) => {
    delete values.profilePhoto
    this.props.saveGmaUser(values);
  }

  handleFile = (e) => {
    this.props.uploadImage(this.props.authCookie, e.target.files[0]);
  }

  render() {
    const {saving, saved, error, loading, currentUser} = this.props;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      return (
        <div>
          {saved &&
            <Alert type="success" heading="Success" text="Saved Gma." />
          }
          {error &&
            <Alert type="danger" heading="Error" text={error} />
          }
          <GmaForm
            heading="Create Gma"
            onSubmit={this.handleSubmit}
            handleFile={this.handleFile}
            saving={saving}
            profilePhotoUrl={this.props.profilePhotoUrl}
            initialValues={{
              active: false,
              kind: "Gma",
              isAvailableOutsideNeighborhood: false,
              city: City.OAKLAND.name
            }}
            currentUser={currentUser}
          />
          {saved &&
            <Alert type="success" heading="Success" text="Saved Gma." />
          }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  const { saveGma, uploadImage, auth } = state
  return {
    authCookie: auth.cookie,
    currentUser: auth.user,
    saving: saveGma.saving,
    error: saveGma.error,
    saved: saveGma.saved,
    profilePhotoUrl: uploadImage.image_url
  }
}

GmaCreateFormContainer.defaultProps = {
  loading: false
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GmaCreateFormContainer)
