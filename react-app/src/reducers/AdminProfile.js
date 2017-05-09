import * as Types from '../actions/Types';

export const adminProfile = (state = {
  loading: true,
  admin: undefined,
  error: undefined
}, action) => {
  switch(action.type) {
    case Types.FETCH_ADMIN_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.FETCH_ADMIN_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        admin: action.admin,
        error: undefined
      })
    }
    case Types.FETCH_ADMIN_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        admin: undefined,
        error: action.error
      })
    }
    default:
      return state;
  }
}
