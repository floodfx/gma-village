import React, { Component, PropTypes } from 'react';
import ParentsList from '../components/ParentsList'
import { connect } from 'react-redux'
import  { fetchParents }  from '../actions/ParentsListContainer'
import  { Neighborhood }  from 'gma-village-data-model'


class ParentsListContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchParents())
  }

  render() {
    return (
      <div>
        <div className="row">
          <ParentsList parents={this.props.parents}
            loading={this.props.loading}
            error={this.props.error} />
        </div>
      </div>
    );
  }
}

ParentsListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  parents: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  const { parentsList } = state
  return {
    loading: parentsList.loading,
    parents: parents,
    error: parentsList.error,
  }
}

export default connect(mapStateToProps)(ParentsListContainer)
