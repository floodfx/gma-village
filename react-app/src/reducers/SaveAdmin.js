import * as Types from '../actions/Types';

export const saveAdmin = (state = {
  saving: false,
  saved: false,
  admin: {}
}, action) => {
  switch(action.type) {
    case Types.SAVE_ADMIN_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case Types.SAVE_ADMIN_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        admin: action.admin
      })
    }
    case Types.SAVE_ADMIN_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case Types.RESET_SAVE_ADMIN_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        admin: {}
      })
    }
    default:
      return state;
  }
}
