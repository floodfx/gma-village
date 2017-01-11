export const SAVE_ADMIN_USER_REQUEST = "SAVE_ADMIN_USER_REQUEST"
export const SAVE_ADMIN_USER_REQUEST_SUCCESS = "SAVE_ADMIN_USER_REQUEST_SUCCESS"
export const SAVE_ADMIN_USER_REQUEST_FAILURE = "SAVE_ADMIN_USER_REQUEST_FAILURE"
export const RESET_SAVE_ADMIN_USER_REQUEST = "RESET_SAVE_ADMIN_USER_REQUEST"


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

export const resetAdminUserRequest = () => ({
  type: RESET_SAVE_ADMIN_USER_REQUEST
})

export const resetAdminUser = () => {
  return (dispatch) => {
    dispatch(resetAdminUserRequest());
  }
}

export const saveAdminUser = (graphQLClient, admin) => {
  return (dispatch) => {
    dispatch(saveAdminUserRequest());
    return graphQLClient.query(`
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
