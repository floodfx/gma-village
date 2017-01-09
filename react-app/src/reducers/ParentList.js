import {
  INIT_PARENT_LIST_REQUEST,
  INIT_PARENT_LIST_REQUEST_SUCCESS,
  INIT_PARENT_LIST_REQUEST_FAILURE
} from '../actions/ParentListContainer'

const parentList = (state = {
  loading: true,
  parents: [],
  error: ''
}, action) => {
  switch(action.type) {
    case INIT_PARENT_LIST_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case INIT_PARENT_LIST_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        parents: action.parents
      })
    }
    case INIT_PARENT_LIST_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        parents: [],
        error: action.error
      })
    }    
    default:
      return state;
  }
}

export default parentList
