import {
  SAVE_PARENT_USER_REQUEST,
  SAVE_PARENT_USER_REQUEST_SUCCESS,
  SAVE_PARENT_USER_REQUEST_FAILURE,
  RESET_SAVE_PARENT_USER_REQUEST
} from '../actions/ParentSave';

const saveParent = (state = {
  saving: false,
  saved: false
}, action) => {
  switch(action.type) {
    case SAVE_PARENT_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case SAVE_PARENT_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        parent: action.parent
      })
    }
    case SAVE_PARENT_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case RESET_SAVE_PARENT_USER_REQUEST: {
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

export default saveParent;
