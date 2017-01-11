import React, { Component, PropTypes } from 'react';
import ParentList from '../components/ParentList';
import { connect } from 'react-redux';
import  { fetchParents }  from '../actions/ParentListContainer';
import injectGraphQLClient from '../graphql/injectGraphQLClient';

class ParentListContainer extends Component {

  componentWillMount() {
    const { dispatch, graphQLClient } = this.props;
    dispatch(fetchParents(graphQLClient));
  }

  render() {
    return (
      <div>
        <div className="row">
          <ParentList parents={this.props.parents}
            loading={this.props.loading}
            error={this.props.error} />
        </div>
      </div>
    );
  }
}

ParentListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  parents: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  const { parentList } = state
  return {
    loading: parentList.loading,
    parents: parentList.parents,
    error: parentList.error,
  }
}

export default injectGraphQLClient(connect(mapStateToProps)(ParentListContainer));
