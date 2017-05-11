import React, { Component, PropTypes } from 'react';
import GmasList from '../components/GmasList'
import GmasFilter from '../components/GmasFilter'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  { Availability, CareAge, CareLocation, Neighborhood }  from 'gma-village-data-model'
import { ActionCreators } from '../actions';

export const WILLING_TO_TRAVEL = "willingToTravel"

class GmasListContainer extends Component {

  componentWillMount() {
    const { fetchGmas, user } = this.props;
    if(user && user.user_type === 'ADMIN') {
      fetchGmas(user.account_kit_access_token);
    } else {
      fetchGmas(user.account_kit_access_token, true);
    }

  }

  onFilterClick = (vals) => {
    vals.forEach((val) => this.props.filterGmasList(val));
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
  return gmas.filter((gma) => {
    let availRes = availFilters.reduce((prev, curr) => {
        return prev |= gma.availabilities.includes(curr.name)
      }, false);
    let locRes = locFilters.reduce((prev, curr) => {
      var currName = curr.name === 'PROVIDERS_HOME' ? 'PROVIDERS_HOME' : 'ELSEWHERE';
      return prev |= gma.care_locations.includes(currName)
    }, false)
    let ageRes = ageFilters.reduce((prev, curr) => {
      return prev |= gma.care_ages.includes(curr.name)
    }, false)
    let willingToTravelFilterAndGmaAvail = (filters.includes(WILLING_TO_TRAVEL) && gma.available_outside_neighborhood)
    let neighRes = neighFilters.reduce((prev, curr) => {
      return prev |= (Neighborhood.parse(gma.neighborhood).name === curr.name)
    }, false)
    let activeRes = activeStatusFilters.reduce((prev, curr) => {
      return prev &= gma.active
    }, true)
    // console.log(availRes, locRes, ageRes, neighRes, willingToTravelFilterAndGmaAvail, activeRes, (availRes && locRes && ageRes && (neighRes || willingToTravelFilterAndGmaAvail) && activeRes))
    return availRes && locRes && ageRes && (neighRes || willingToTravelFilterAndGmaAvail) && activeRes;
  })
}

const mapStateToProps = (state) => {
  const { gmasList, auth } = state
  const gmas = filterGmas(gmasList.gmas, gmasList.filters)
  // console.log("gmas after filter", gmas)
  return {
    loading: gmasList.loading,
    gmas: gmas,
    error: gmasList.error,
    filters: gmasList.filters,
    auth: auth.cookie,
    user: auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GmasListContainer)
