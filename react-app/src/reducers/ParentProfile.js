import * as Types from '../actions/Types';

export const parentProfile = (state = {
  loading: true,
  error: undefined,
  parent: undefined
}, action) => {
  switch(action.type) {
    case Types.FETCH_PARENT_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.FETCH_PARENT_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        parent: action.parent,
        error: undefined
      })
    }
    case Types.FETCH_PARENT_REQUEST_FAILURE: {
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
