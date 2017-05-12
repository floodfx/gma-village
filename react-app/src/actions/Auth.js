import rp from 'request-promise';
import * as Types from './Types';
import { AUTH_BASE } from '../util';
import cookies from 'react-cookie';
import { browserHistory } from 'react-router';

const COOKIE_NAME = "gv_auth"

export const checkAuthCookie = () => ({
  type: Types.CHECK_AUTH_COOKIE
})

export const checkAuthCookieSuccess = (cookie) => ({
  type: Types.CHECK_AUTH_COOKIE_SUCCESS,
  cookie: cookie
})

export const checkAuthCookieFailure = () => ({
  type: Types.CHECK_AUTH_COOKIE_FAILURE
})

export const saveAuthCookieAction = (cookie) => ({
  type: Types.SAVE_AUTH_COOKIE,
  cookie: cookie
})

export const removeAuthCookieAction = () => ({
  type: Types.REMOVE_AUTH_COOKIE
})

export const currentUserRequest = (access_token) => ({
  type: Types.CURRENT_USER_REQUEST,
  access_token
})

export const currentUserRequestSuccess = (user) => ({
  type: Types.CURRENT_USER_REQUEST_SUCCESS,
  user
})

export const currentUserRequestFailure = (error) => ({
  type: Types.CURRENT_USER_REQUEST_FAILURE,
  error
})

export const logoutRequest = () => ({
  type: Types.LOGOUT_REQUEST
})

export const fetchAuthCookie = () => {
  return (dispatch) => {
    dispatch(checkAuthCookie())
    const cookie = cookies.load(COOKIE_NAME, {path: "/"});
    if(cookie != null) {
      try {
        var c = JSON.parse(cookie);
        if(c.id && c.phone && c.account_kit_access_token && c.account_kit_user_id) {
          dispatch(checkAuthCookieSuccess(c));
        } else {
          dispatch(checkAuthCookieFailure());
        }
      } catch(e) {
        dispatch(checkAuthCookieFailure());
      }
    } else {
      dispatch(checkAuthCookieFailure());
    }
  }
}

export const saveAuthCookie = (cookie) => {
  return (dispatch) => {
    cookies.save(COOKIE_NAME, cookie, {path: "/"});
    dispatch(saveAuthCookieAction(cookie))
  }
}

export const removeAuthCookie = () => {
  return (dispatch) => {
    cookies.remove(COOKIE_NAME, {path: "/"});
    dispatch(removeAuthCookieAction())
  }
}

export const currentUser = (access_token) => {
  return (dispatch) => {
    dispatch(currentUserRequest(access_token));
    var options = {
      method: 'GET',
      uri: `${AUTH_BASE}/accountkit/current`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(currentUserRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(currentUserRequestFailure(err))
    });
  }
}

export const logout = () => {
  return (dispatch) => {
    cookies.remove(COOKIE_NAME, {path: "/"});
    browserHistory.push("/login")
    dispatch(logoutRequest());
  }
}
