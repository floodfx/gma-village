import * as Types from '../actions/Types';

export const saveGma = (state = {
  saving: false,
}, action) => {
  switch(action.type) {
    case Types.SAVE_GMA_USER_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case Types.SAVE_GMA_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        gma: action.gma
      })
    }
    case Types.SAVE_GMA_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case Types.RESET_SAVE_GMA_USER_REQUEST: {
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
