import * as Types from '../actions/Types';

export const saveCareNeed = (state = {
  saving: false,
  saved: false,
  careNeed: undefined
}, action) => {
  switch(action.type) {
    case Types.SAVE_CARE_NEED_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case Types.SAVE_CARE_NEED_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        careNeed: action.careNeed
      })
    }
    case Types.SAVE_CARE_NEED_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case Types.RESET_SAVE_CARE_NEED_REQUEST: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        careNeed: {}
      })
    }
    default:
      return state;
  }
}
