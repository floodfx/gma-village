import {
  SAVE_ADMIN_USER_REQUEST,
  SAVE_ADMIN_USER_REQUEST_SUCCESS,
  SAVE_ADMIN_USER_REQUEST_FAILURE
} from '../actions/AdminCreateFormContainer'

const createAdmin = (state = {
  saving: false,
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
    default:
      return state;
  }
}

export default createAdmin
