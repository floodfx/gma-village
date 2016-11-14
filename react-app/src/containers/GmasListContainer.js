import React, { Component, PropTypes } from 'react';
import GmasList from '../components/GmasList'
import { connect } from 'react-redux'
import  { fetchGmas }  from '../actions/GmasListContainer'

class GmasListContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchGmas())
  }

  render() {
    return (
      <div>
        <GmasList gmas={this.props.gmas}
          loading={this.props.loading}
          error={this.props.error} />
        {this.props.children}
      </div>
    );
  }
}

GmasListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  gmas: PropTypes.arrayOf(PropTypes.object)
};

const filterGmas = (gmas, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return gmas
    case 'SHOW_COMPLETED':
      return gmas.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return gmas.filter(t => !t.completed)
    default:
      return gmas
  }
}

const mapStateToProps = (state) => {
  const { gmasList } = state
  return {
    loading: gmasList.loading,
    gmas: filterGmas(gmasList.gmas, gmasList.filter),
    error: gmasList.error
  }
}

export default connect(mapStateToProps)(GmasListContainer)
