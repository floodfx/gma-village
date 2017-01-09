import {
  FETCH_ADMIN_REQUEST,
  FETCH_ADMIN_REQUEST_SUCCESS,
  FETCH_ADMIN_REQUEST_FAILURE
} from '../actions/AdminProfile';

const adminProfile = (state = {
  loading: true,
  admin: {},
  error: ''
}, action) => {
  switch(action.type) {
    case FETCH_ADMIN_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case FETCH_ADMIN_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        admin: action.admin
      })
    }
    case FETCH_ADMIN_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        admin: {},
        error: action.error
      })
    }
    default:
      return state;
  }
}

export default adminProfile
