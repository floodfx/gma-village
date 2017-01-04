import {
  INIT_ADMIN_LIST_REQUEST,
  INIT_ADMIN_LIST_REQUEST_SUCCESS,
  INIT_ADMIN_LIST_REQUEST_FAILURE
} from '../actions/AdminListContainer'

const adminList = (state = {
  loading: true,
  admins: [],
  error: ''
}, action) => {
  switch(action.type) {
    case INIT_ADMIN_LIST_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case INIT_ADMIN_LIST_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        admins: action.admins
      })
    }
    case INIT_ADMIN_LIST_REQUEST_FAILURE: {
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

export default adminList
