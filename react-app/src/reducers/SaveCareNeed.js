import {
  SAVE_CARE_NEED_REQUEST,
  SAVE_CARE_NEED_REQUEST_SUCCESS,
  SAVE_CARE_NEED_REQUEST_FAILURE,
  RESET_SAVE_CARE_NEED_REQUEST
} from '../actions/CareNeedSave'

const saveCareNeed = (state = {
  saving: false,
  saved: false,
  careNeed: undefined
}, action) => {
  switch(action.type) {
    case SAVE_CARE_NEED_REQUEST: {
      return Object.assign({}, state, {
        saving: true
      })
    }
    case SAVE_CARE_NEED_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        saving: false,
        saved: true,
        careNeed: action.careNeed
      })
    }
    case SAVE_CARE_NEED_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        error: action.error
      })
    }
    case RESET_SAVE_CARE_NEED_REQUEST: {
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

export default saveCareNeed
