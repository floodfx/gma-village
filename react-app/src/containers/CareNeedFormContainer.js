import React, { Component } from 'react';
import CareNeedForm from '../components/CareNeedForm';
import { connect } from 'react-redux';
import { fetchParent }  from '../actions/ParentProfile';
import { saveCareNeed, resetCareNeed }  from '../actions/CareNeedSave';
import { fetchGmas } from '../actions/GmasListContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import injectGraphQLClient from '../graphql/injectGraphQLClient';
import {
  matchGmasToCareNeed
} from '../careNeed/matcher';

class CareNeedFormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const { auth, dispatch, graphQLClient } = this.props;
    var parentId = null;
    if(auth.user.kind === "Admin") {
      parentId = this.props.params.parentId;      
    } else if(auth.user.kind === "Parent") {
      parentId = auth.user.id;
    }
    if(parentId) {
      dispatch(fetchParent(graphQLClient, parentId));   
    }
    dispatch(fetchGmas(graphQLClient, true))
  }

  componentWillUnmount() {
    this.props.dispatch(resetCareNeed())
  }

  handleSubmit = (careNeed) => {    
    delete careNeed.careDateStartEnd; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient, gmas } = this.props;
    var matchingGmas = matchGmasToCareNeed(gmas, careNeed);
    if(matchingGmas.length > 0) {
      dispatch(saveCareNeed(graphQLClient, careNeed, matchingGmas));
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
        kids: parent.kids,
        neighborhood: parent.neighborhood,
        otherNeighborhood: parent.otherNeighborhood,
        parentId: parent.id
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

export default injectGraphQLClient(connect(mapStateToProps)(CareNeedFormContainer));
