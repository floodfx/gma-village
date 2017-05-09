import React, { Component, PropTypes } from 'react';
import ParentList from '../components/ParentList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class ParentListContainer extends Component {

  componentWillMount() {
    this.props.fetchParents();
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ParentListContainer)
