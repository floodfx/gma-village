import * as Types from '../actions/Types';

export const parentList = (state = {
  loading: true,
  parents: [],
  error: ''
}, action) => {
  switch(action.type) {
    case Types.INIT_PARENT_LIST_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.INIT_PARENT_LIST_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        parents: action.parents
      })
    }
    case Types.INIT_PARENT_LIST_REQUEST_FAILURE: {
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
