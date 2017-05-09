import {
  SAVE_ADMIN_USER_REQUEST,
  SAVE_ADMIN_USER_REQUEST_SUCCESS,
  SAVE_ADMIN_USER_REQUEST_FAILURE,
  RESET_SAVE_ADMIN_USER_REQUEST
} from '../actions/Types'

export const saveAdmin = (state = {
  saving: false,
  saved: false,
  admin: {}
}, action) => {
  switch(action.type) {
    case SAVE_ADMIN_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case SAVE_ADMIN_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        admin: action.admin
      })
    }
    case SAVE_ADMIN_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case RESET_SAVE_ADMIN_USER_REQUEST: {
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
