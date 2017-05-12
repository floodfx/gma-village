import React, { Component } from 'react';
import CareNeedForm from '../components/CareNeedForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import { ActionCreators } from '../actions';
import {
  matchGmasToCareNeed
} from '../careNeed/matcher';

class CareNeedFormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const { auth } = this.props;
    const access_token = auth.cookie.account_kit_access_token;
    var parentId = null;
    if(auth.user.user_type === "ADMIN") {
      parentId = this.props.params.parentId;
    } else if(auth.user.user_type === "PARENT") {
      parentId = auth.user.id;
    }
    if(parentId) {
      this.props.fetchParent(access_token, parentId);
    }
    this.props.fetchGmas(access_token, true);
  }

  componentWillUnmount() {
    this.props.resetCareNeed();
  }

  handleSubmit = (careNeed) => {
    delete careNeed.careDateStartEnd; // remove profile photo from form (uploaded already)
    const { gmas, auth } = this.props;
    const access_token = auth.cookie.account_kit_access_token;
    var matching_gmas = matchGmasToCareNeed(gmas, careNeed);
    console.log("matching_gmas", matching_gmas)
    if(matching_gmas.length > 0) {
      careNeed.matching_gmas = matching_gmas;
      this.props.saveCareNeed(access_token, careNeed);
    } else {
      const warning = "Unable to find Gmas who match your care requirements."
      this.setState({warning})
    }
  }

  render() {
    const {saving, saved, parent, error, loading} = this.props;
    const { warning } = this.state;
    if(loading) {
      return (
        <LoadingIndicator text="Loading..." />
      );
    } else {
      const initialValues = {
        children: parent.children,
        neighborhood: parent.neighborhood,
        other_neighborhood: parent.other_neighborhood,
        parent: parent
      }
      const successText = "Thank you for posting! Gmas that meet you child care need criteria will receive you post and will text you if available."
      return (
        <div>
          {saved &&
            <Alert type="success" heading="Success" text={successText}/>
          }
          {warning &&
            <Alert type="warning" heading="Uh oh..." text={warning} />
          }
          {error &&
            <Alert type="danger" heading="Error" text={error} />
          }
          <CareNeedForm
            heading="Post a Care Request"
            description="Post the details of your child care need and available Gmas will text you back."
            onSubmit={this.handleSubmit}
            saving={saving}
            initialValues={initialValues}
            />
          {saved &&
            <Alert type="success" heading="Success" text={successText}/>
          }
        </div>
      )
    }
  }
}

CareNeedFormContainer.defaultProps = {
  saving: false,
  saved: false,
  loading: true,
};

const mapStateToProps = (state) => {
  const { gmasList, parentProfile, saveCareNeed, auth } = state
  return {
    auth: auth,
    saving: saveCareNeed.saving,
    error: saveCareNeed.error,
    parent: parentProfile.parent,
    saved: saveCareNeed.saved,
    loading: parentProfile.loading,
    gmas: gmasList.gmas
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CareNeedFormContainer)
