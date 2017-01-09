import React, { Component, PropTypes } from 'react';
import ParentList from '../components/ParentList'
import { connect } from 'react-redux'
import  { fetchParents }  from '../actions/ParentListContainer'
import  { Neighborhood }  from 'gma-village-data-model'


class ParentListContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchParents())
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

export default connect(mapStateToProps)(ParentListContainer)
