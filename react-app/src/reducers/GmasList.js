import {
  INIT_GMAS_LIST_REQUEST,
  INIT_GMAS_LIST_REQUEST_SUCCESS,
  INIT_GMAS_LIST_REQUEST_FAILURE
} from '../actions/GmasListContainer'

const gmasList = (state = {
  loading: false,
  gmas: [],
  error: ''
}, action) => {
  switch(action.type) {
    case INIT_GMAS_LIST_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case INIT_GMAS_LIST_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        gmas: action.gmas
      })
    }
    case INIT_GMAS_LIST_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        gmas: [],
        error: action.error
      })
    }
    default:
      return state;
  }
}

export default gmasList
