import React, { Component, PropTypes } from 'react';
import GmasList from '../components/GmasList'
import GmasFilter from '../components/GmasFilter'
import { connect } from 'react-redux'
import  { fetchGmas, filterGmasList }  from '../actions/GmasListContainer'
import  { Availability, CareAge, CareLocation, Neighborhood }  from 'gma-village-data-model'
import injectGraphQLClient from '../graphql/injectGraphQLClient';

export const WILLING_TO_TRAVEL = "willingToTravel"

class GmasListContainer extends Component {

  componentWillMount() {
    const { dispatch, graphQLClient, user } = this.props;
    if(user && user.kind === 'Admin') {
      dispatch(fetchGmas(graphQLClient));
    } else {
      dispatch(fetchGmas(graphQLClient, true));
    }
    
  }

  onFilterClick = (vals) => {
    vals.forEach((val) => this.props.dispatch(filterGmasList(val)))
  }

  render() {
    return (
      <div className='mh3'>
        <div className="row">
          <div className="mb3 col-xs-12 col-sm-12 col-md-12 gma-orange-border">
            <h3 className="gma-orange">Welcome!</h3>
            <p>
              We look forward to connecting you to our community of Gma's.
              Please select all the apply below to find a Gma that matches your needs.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="mb3 col-xs-12 col-sm-12 col-md-12 gma-orange-border">
            <GmasFilter 
              filters={this.props.filters} 
              onFilterClick={this.onFilterClick}
              user={this.props.user} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 gma-orange-border">
            <GmasList gmas={this.props.gmas}
              loading={this.props.loading}
              error={this.props.error}
              user={this.props.user} />
          </div>
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
  let activeStatusFilters = filters.filter((filter) => filter.constructor === Object)
  console.log("activeStatusFilters", activeStatusFilters)
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
    let activeRes = activeStatusFilters.reduce((prev, curr) => {
      return prev &= gma.active
    }, true)
    return availRes && locRes && ageRes && (neighRes || willingToTravelFilterAndGmaAvail) && activeRes;
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
    auth: auth.cookie,
    user: auth.user
  }
}

export default injectGraphQLClient(connect(mapStateToProps)(GmasListContainer));
