import React, { Component, PropTypes } from 'react';
import GmasList from '../components/GmasList'
import GmasFilter from '../components/GmasFilter'
import { connect } from 'react-redux'
import  { fetchGmas, filterGmasList }  from '../actions/GmasListContainer'
import  { Availability, CareAge, CareLocation, Neighborhood }  from 'gma-village-data-model'

class GmasListContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchGmas())
  }

  onFilterClick = (vals) => {
    console.log("vals", vals)
    vals.forEach((val) => this.props.dispatch(filterGmasList(val)))
  }

  render() {
    return (
      <div>
        <div className="row">
          <GmasFilter filters={this.props.filters} onFilterClick={this.onFilterClick} />
        </div>
        <div className="row">
          <GmasList gmas={this.props.gmas}
            loading={this.props.loading}
            error={this.props.error} />
        </div>
      </div>
    );
  }
}

GmasListContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  filters: PropTypes.array.isRequired,
  gmas: PropTypes.arrayOf(PropTypes.object)
};

const filterGmas = (gmas, filters) => {
  console.log("filtering", gmas, filters)
  var availFilters = filters.filter((filter) => filter.constructor === Availability)
  var locFilters = filters.filter((filter) => filter.constructor === CareLocation)
  var ageFilters = filters.filter((filter) => filter.constructor === CareAge)
  var neighFilters = filters.filter((filter) => filter.constructor === Neighborhood)
  return gmas.filter((gma) => {
    var availRes = availFilters.reduce((prev, curr) => {
        return prev |= gma.availabilities.includes(curr.name)
      }, false);
    var locRes = locFilters.reduce((prev, curr) => {
      return prev |= gma.careLocations.includes(curr.name)
    }, false)
    var ageRes = ageFilters.reduce((prev, curr) => {
      return prev |= gma.careAges.includes(curr.name)
    }, false)
    var neighRes = neighFilters.reduce((prev, curr) => {
      return prev |= (gma.neighborhood === curr.name) || gma.isAvailableOutsideNeighborhood
    }, false)
    return availRes && locRes && ageRes && neighRes;
  })
}

const mapStateToProps = (state) => {
  const { gmasList } = state
  const gmas = filterGmas(gmasList.gmas, gmasList.filters)
  return {
    loading: gmasList.loading,
    gmas: gmas,
    error: gmasList.error,
    filters: gmasList.filters
  }
}

export default connect(mapStateToProps)(GmasListContainer)
