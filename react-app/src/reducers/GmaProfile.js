import {
  FETCH_GMA_REQUEST,
  FETCH_GMA_REQUEST_SUCCESS,
  FETCH_GMA_REQUEST_FAILURE
} from '../actions/Types';

export const gmaProfile = (state = {
  loading: true,
  error: undefined,
  gma: undefined
}, action) => {
  switch(action.type) {
    case FETCH_GMA_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case FETCH_GMA_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        gma: action.gma
      })
    }
    case FETCH_GMA_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        gma: {},
        error: action.error
      })
    }
    default:
      return state;
  }
}
