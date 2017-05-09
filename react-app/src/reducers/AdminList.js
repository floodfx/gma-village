import * as Types from '../actions/Types';

export const adminList = (state = {
  loading: true,
  admins: [],
  error: ''
}, action) => {
  switch(action.type) {
    case Types.INIT_ADMIN_LIST_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.INIT_ADMIN_LIST_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        admins: action.admins
      })
    }
    case Types.INIT_ADMIN_LIST_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        admins: [],
        error: action.error
      })
    }
    default:
      return state;
  }
}
