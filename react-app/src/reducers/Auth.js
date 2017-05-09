import {
  ACCOUNT_KIT_AUTH_REQUEST,
  ACCOUNT_KIT_AUTH_REQUEST_SUCCESS,
  ACCOUNT_KIT_AUTH_REQUEST_FAILURE
} from '../actions/Types'

import {
  CHECK_AUTH_COOKIE,
  CHECK_AUTH_COOKIE_SUCCESS,
  CHECK_AUTH_COOKIE_FAILURE,
  SAVE_AUTH_COOKIE,
  CURRENT_USER_REQUEST,
  CURRENT_USER_REQUEST_SUCCESS,
  CURRENT_USER_REQUEST_FAILURE,
  LOGOUT_REQUEST
} from '../actions/Auth'

export const auth = (state = {
  loading: false
}, action) => {
  switch(action.type) {
    case ACCOUNT_KIT_AUTH_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case ACCOUNT_KIT_AUTH_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        user: action.user
      })
    }
    case ACCOUNT_KIT_AUTH_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    case CHECK_AUTH_COOKIE: {
      return Object.assign({}, state, {})
    }
    case CHECK_AUTH_COOKIE_SUCCESS: {
      return Object.assign({}, state, {
        cookie: action.cookie
      })
    }
    case CHECK_AUTH_COOKIE_FAILURE: {
      return Object.assign({}, state, {
        cookie: false
      })
    }
    case SAVE_AUTH_COOKIE: {
      return Object.assign({}, state, {
        cookie: action.cookie
      })
    }
    case CURRENT_USER_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        access_token: action.access_token
      })
    }
    case CURRENT_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        user: action.user
      })
    }
    case CURRENT_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    case LOGOUT_REQUEST: {
      return Object.assign({}, state, {
        user: undefined,
        cookie: undefined
      })
    }
    default:
      return state;
  }
}
