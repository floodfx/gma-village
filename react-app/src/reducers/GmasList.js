import {
  INIT_GMAS_LIST_REQUEST,
  INIT_GMAS_LIST_REQUEST_SUCCESS,
  INIT_GMAS_LIST_REQUEST_FAILURE,
  FILTER_GMAS_LIST
} from '../actions/GmasListContainer'
import {Availability, CareAge, CareLocation, Neighborhood} from 'gma-village-data-model'
import ActiveStatus from '../components/ActiveStatus';

const defaultFilters = []
  .concat(Availability.enumValues)
  .concat(CareAge.enumValues)
  .concat(CareLocation.enumValues)
  .concat(Neighborhood.enumValues)
  .concat(ActiveStatus.enumValues)

const gmasList = (state = {
  loading: true,
  gmas: [],
  error: '',
  filters: defaultFilters
}, action) => {
  switch(action.type) {
    case INIT_GMAS_LIST_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case INIT_GMAS_LIST_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        gmas: action.gmas
      })
    }
    case INIT_GMAS_LIST_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        gmas: [],
        error: action.error
      })
    }
    case FILTER_GMAS_LIST: {
      let newFilters = []
      // remove filter
      if(state.filters.includes(action.filter)) {
        var index = state.filters.indexOf(action.filter);
        newFilters = [
          ...state.filters.slice(0, index),
          ...state.filters.slice(index + 1)
        ]
      }
      // add filter
      else {
        newFilters = state.filters.concat(action.filter)
      }
      return Object.assign({}, state, {
        filters: newFilters
      })
    }
    default:
      return state;
  }
}

export default gmasList
