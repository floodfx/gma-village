import * as Types from '../actions/Types'

export const auth = (state = {
  loading: false
}, action) => {
  switch(action.type) {
    case Types.ACCOUNT_KIT_AUTH_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.ACCOUNT_KIT_AUTH_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        user: action.user
      })
    }
    case Types.ACCOUNT_KIT_AUTH_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    case Types.CHECK_AUTH_COOKIE: {
      return Object.assign({}, state, {})
    }
    case Types.CHECK_AUTH_COOKIE_SUCCESS: {
      return Object.assign({}, state, {
        cookie: action.cookie
      })
    }
    case Types.CHECK_AUTH_COOKIE_FAILURE: {
      return Object.assign({}, state, {
        cookie: false
      })
    }
    case Types.SAVE_AUTH_COOKIE: {
      return Object.assign({}, state, {
        cookie: action.cookie
      })
    }
    case Types.CURRENT_USER_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        access_token: action.access_token
      })
    }
    case Types.CURRENT_USER_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        user: action.user
      })
    }
    case Types.CURRENT_USER_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    case Types.LOGOUT_REQUEST: {
      return Object.assign({}, state, {
        user: undefined,
        cookie: undefined
      })
    }
    default:
      return state;
  }
}
