import {
  FETCH_PARENT_REQUEST,
  FETCH_PARENT_REQUEST_SUCCESS,
  FETCH_PARENT_REQUEST_FAILURE
} from '../actions/Types';

export const parentProfile = (state = {
  loading: true,
  error: undefined,
  parent: undefined
}, action) => {
  switch(action.type) {
    case FETCH_PARENT_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case FETCH_PARENT_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        parent: action.parent,
        error: undefined
      })
    }
    case FETCH_PARENT_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        parent: undefined,
        error: action.error
      })
    }
    default:
      return state;
  }
}
