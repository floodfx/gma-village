import * as Types from '../actions/Types';

export const saveParent = (state = {
  saving: false,
  saved: false
}, action) => {
  switch(action.type) {
    case Types.SAVE_PARENT_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case Types.SAVE_PARENT_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        parent: action.parent
      })
    }
    case Types.SAVE_PARENT_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case Types.RESET_SAVE_PARENT_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        parent: undefined
      })
    }
    default:
      return state;
  }
}
