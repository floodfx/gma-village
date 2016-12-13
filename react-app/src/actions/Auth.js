import cookies from 'react-cookie';
import client from '../graphql/client'

export const CHECK_AUTH_COOKIE = "CHECK_AUTH_COOKIE"
export const CHECK_AUTH_COOKIE_SUCCESS = "CHECK_AUTH_COOKIE_SUCCESS"
export const CHECK_AUTH_COOKIE_FAILURE = "CHECK_AUTH_COOKIE_FAILURE"
export const SAVE_AUTH_COOKIE = "SAVE_AUTH_COOKIE"
export const REMOVE_AUTH_COOKIE = "REMOVE_AUTH_COOKIE"
export const CURRENT_USER_REQUEST = "CURRENT_USER_REQUEST"
export const CURRENT_USER_REQUEST_SUCCESS = "CURRENT_USER_REQUEST_SUCCESS"
export const CURRENT_USER_REQUEST_FAILURE = "CURRENT_USER_REQUEST_FAILURE"

const COOKIE_NAME = "gv_auth"

export const checkAuthCookie = () => ({
  type: CHECK_AUTH_COOKIE
})

export const checkAuthCookieSuccess = (cookie) => ({
  type: CHECK_AUTH_COOKIE_SUCCESS,
  cookie: cookie
})

export const checkAuthCookieFailure = () => ({
  type: CHECK_AUTH_COOKIE_FAILURE
})

export const saveAuthCookieAction = (cookie) => ({
  type: SAVE_AUTH_COOKIE,
  cookie: cookie
})

export const removeAuthCookieAction = () => ({
  type: REMOVE_AUTH_COOKIE
})

export const currentUserRequest = (auth_cookie) => ({
  type: CURRENT_USER_REQUEST,
  auth_cookie
})

export const currentUserRequestSuccess = (user) => ({
  type: CURRENT_USER_REQUEST_SUCCESS,
  user
})

export const currentUserRequestFailure = (error) => ({
  type: CURRENT_USER_REQUEST_FAILURE,
  error
})

export const fetchAuthCookie = () => {
  return (dispatch) => {
    dispatch(checkAuthCookie())
    const cookie = cookies.load(COOKIE_NAME, {path: "/"});
    if(cookie != null) {
      try {
        dispatch(checkAuthCookieSuccess(JSON.parse(cookie)));
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
    cookies.save(COOKIE_NAME, cookie);
    dispatch(saveAuthCookieAction(cookie))
  }
}

export const removeAuthCookie = () => {
  return (dispatch) => {
    cookies.remove(COOKIE_NAME, {path: "/"});
    dispatch(removeAuthCookieAction())
  }
}

export const currentUser = (auth_cookie) => {
  return (dispatch) => {
    dispatch(currentUserRequest(auth_cookie));
    return client.query(`
      query login($id: ID!, $phone: String!, $ak_access_token: String!, $ak_user_id:String!){
        currentUser(auth:{id:$id, phone:$phone, ak_access_token:$ak_access_token, ak_user_id:$ak_user_id}) {
          ... on Admin {
            id,
            first_name,
            last_name,
            phone,
            kind,
            active,
            ak_access_token,
            ak_user_id,
            ak_token_refresh_interval_sec,
            last_login_timestamp,
            created_on_timestamp,
            member_since_timestamp,
            roles
          }
          ... on Gma {
            id,
            first_name,
            last_name,
            phone,
            kind,
            active,
            ak_access_token,
            ak_user_id,
            ak_token_refresh_interval_sec,
            last_login_timestamp,
            created_on_timestamp,
            member_since_timestamp,
            availabilities,
            otherAvailability,
            careAges,
            careExperiences,
            otherCareExperience,
            careLocations,
            careTrainings,
            otherCareTraining,
            city,
            demeanors,
            otherDemeanor,
            neighborhood,
            otherNeighborhood,
            isAvailableOutsideNeighborhood,
            whyCareForKidsText,
            additionalInformationText,
          }
          ... on Parent {
            id,
            first_name,
            last_name,
            phone,
            kind,
            active,
            ak_access_token,
            ak_user_id,
            ak_token_refresh_interval_sec,
            last_login_timestamp,
            created_on_timestamp,
            member_since_timestamp
          }
        }
      }
    `, auth_cookie).then(data => {
        dispatch(currentUserRequestSuccess(data.currentUser))
    }).catch(err => {
      dispatch(currentUserRequestFailure(err))
    });
  }
}
