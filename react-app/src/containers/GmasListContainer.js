import React, { Component, PropTypes } from 'react';
import GmasList from '../components/GmasList'
import GmasFilter from '../components/GmasFilter'
import { connect } from 'react-redux'
import  { fetchGmas, filterGmasList }  from '../actions/GmasListContainer'
import  { Availability, CareAge, CareLocation, Neighborhood }  from 'gma-village-data-model'

export const WILLING_TO_TRAVEL = "willingToTravel"

class GmasListContainer extends Component {

  componentWillMount() {
    this.props.dispatch(fetchGmas())
  }

  onFilterClick = (vals) => {
    vals.forEach((val) => this.props.dispatch(filterGmasList(val)))
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-sm-8 gma-orange-border" style={{marginBottom: '10px'}}>
            <h3 className="gma-orange">Welcome!</h3>
            <p>
              We look forward to connecting you to our community of Gma's.
              Please select all the apply below to find a Gma that matches your needs.
            </p>
          </div>
        </div>
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
  let availFilters = filters.filter((filter) => filter.constructor === Availability)
  let locFilters = filters.filter((filter) => filter.constructor === CareLocation)
  let ageFilters = filters.filter((filter) => filter.constructor === CareAge)
  let neighFilters = filters.filter((filter) => filter.constructor === Neighborhood)
  return gmas.filter((gma) => {
    let availRes = availFilters.reduce((prev, curr) => {
        return prev |= gma.availabilities.includes(curr.name)
      }, false);
    let locRes = locFilters.reduce((prev, curr) => {
      return prev |= gma.careLocations.includes(curr.name)
    }, false)
    let ageRes = ageFilters.reduce((prev, curr) => {
      return prev |= gma.careAges.includes(curr.name)
    }, false)
    let willingToTravelFilterAndGmaAvail = (filters.includes(WILLING_TO_TRAVEL) && gma.isAvailableOutsideNeighborhood)
    let neighRes = neighFilters.reduce((prev, curr) => {
      return prev |= (gma.neighborhood === curr.name)
    }, false)
    return availRes && locRes && ageRes && (neighRes || willingToTravelFilterAndGmaAvail);
  })
}

const mapStateToProps = (state) => {
  const { gmasList, auth } = state
  const gmas = filterGmas(gmasList.gmas, gmasList.filters)
  return {
    loading: gmasList.loading,
    gmas: gmas,
    error: gmasList.error,
    filters: gmasList.filters,
    auth: auth.cookie
  }
}

export default connect(mapStateToProps)(GmasListContainer)
