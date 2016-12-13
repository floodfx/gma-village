import {
  INIT_ACCOUNT_KIT_REQUEST,
  INIT_ACCOUNT_KIT_REQUEST_SUCCESS,
  INIT_ACCOUNT_KIT_REQUEST_FAILURE
} from '../actions/AccountKitContainer'

const accountKitInit = (state = {
  appId: '',
  version: '',
  csrf: '',
  loading: false,
  inited: false
}, action) => {
  switch(action.type) {
    case INIT_ACCOUNT_KIT_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case INIT_ACCOUNT_KIT_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        appId: action.appId,
        version: action.version,
        csrf: action.csrf,
        inited: true
      })
    }
    case INIT_ACCOUNT_KIT_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    default:
      return state;
  }
}

export default accountKitInit
