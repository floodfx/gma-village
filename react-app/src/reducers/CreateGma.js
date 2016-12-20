import {
  SAVE_GMA_USER_REQUEST,
  SAVE_GMA_USER_REQUEST_SUCCESS,
  SAVE_GMA_USER_REQUEST_FAILURE
} from '../actions/GmaCreateFormContainer'

const createGma = (state = {
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
        loading: false,
        gma: action.gma
      })
    }
    case SAVE_GMA_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    default:
      return state;
  }
}

export default createGma
