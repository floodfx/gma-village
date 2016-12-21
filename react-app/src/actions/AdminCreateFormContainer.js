import graphql from '../graphql/client'

export const SAVE_ADMIN_USER_REQUEST = "SAVE_ADMIN_USER_REQUEST"
export const SAVE_ADMIN_USER_REQUEST_SUCCESS = "SAVE_ADMIN_USER_REQUEST_SUCCESS"
export const SAVE_ADMIN_USER_REQUEST_FAILURE = "SAVE_ADMIN_USER_REQUEST_FAILURE"


export const saveAdminUserRequest = () => ({
  type: SAVE_ADMIN_USER_REQUEST
})

export const saveAdminUserRequestSuccess = (admin) => ({
  type: SAVE_ADMIN_USER_REQUEST_SUCCESS,
  admin
})

export const saveAdminUserRequestFailure = () => ({
  type: SAVE_ADMIN_USER_REQUEST_FAILURE
})

export const saveAdminUser = (admin) => {
  return (dispatch) => {
    dispatch(saveAdminUserRequest());
    return graphql.client.query(`
      mutation saveAdminMutation($input: AdminInput!) {
        saveAdmin(input:$input) {
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
          roles,
          profilePhotoUrl
        }
      }
    `, {input: admin}).then(data => {
        dispatch(saveAdminUserRequestSuccess(data.saveAdmin))
    }).catch(err => {
      dispatch(saveAdminUserRequestFailure(err))
    });
  }
}
