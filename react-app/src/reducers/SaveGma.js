import {
  SAVE_GMA_USER_REQUEST,
  SAVE_GMA_USER_REQUEST_SUCCESS,
  SAVE_GMA_USER_REQUEST_FAILURE,
  RESET_SAVE_GMA_USER_REQUEST
} from '../actions/Types'

export const saveGma = (state = {
  saving: false,
}, action) => {
  switch(action.type) {
    case SAVE_GMA_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case SAVE_GMA_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        gma: action.gma
      })
    }
    case SAVE_GMA_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case RESET_SAVE_GMA_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        gma: {}
      })
    }
    default:
      return state;
  }
}
