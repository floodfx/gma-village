import React, { Component } from 'react';
import CareNeedForm from '../components/CareNeedForm';
import { connect } from 'react-redux';
import  { fetchParent }  from '../actions/ParentProfile';
import  { saveCareNeed, resetCareNeed }  from '../actions/CareNeedSave';
import LoadingIndicator from '../components/LoadingIndicator';
import Alert from '../components/Alert';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

class CareNeedFormContainer extends Component {

  componentWillMount() {
    const { auth, dispatch, graphQLClient } = this.props;
    var parentId = null;
    console.log("auth user", auth)
    if(auth.user.kind === "Admin") {
      parentId = this.props.params.parentId;      
    } else if(auth.user.kind === "Parent") {
      parentId = auth.user.id;
    }
    console.log("parentId", parentId)
    if(parentId) {
      dispatch(fetchParent(graphQLClient, parentId));   
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetCareNeed())
  }

  handleSubmit = (values) => {    
    delete values.careDateStartEnd; // remove profile photo from form (uploaded already)
    const { dispatch, graphQLClient } = this.props;
    console.log("values", values)
    dispatch(saveCareNeed(graphQLClient, values));
  }

  render() {
    const {saving, saved, parent, error, loading} = this.props;    
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
  const { parentProfile, saveCareNeed, auth } = state
  return {
    auth: auth,
    saving: saveCareNeed.saving,
    error: saveCareNeed.error,
    parent: parentProfile.parent,
    saved: saveCareNeed.saved,
    loading: parentProfile.loading,
  }
}

export default injectGraphQLClient(connect(mapStateToProps)(CareNeedFormContainer));
