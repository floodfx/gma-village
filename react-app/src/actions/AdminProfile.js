export const FETCH_ADMIN_REQUEST = "FETCH_ADMIN_REQUEST"
export const FETCH_ADMIN_REQUEST_SUCCESS = "FETCH_ADMIN_REQUEST_SUCCESS"
export const FETCH_ADMIN_REQUEST_FAILURE = "FETCH_ADMIN_REQUEST_FAILURE"

export const fetchAdminRequest = () => ({
  type: FETCH_ADMIN_REQUEST
})

export const fetchAdminRequestSuccess = (admin) => ({
  type: FETCH_ADMIN_REQUEST_SUCCESS,
  admin
})

export const fetchAdminRequestFailure = (error) => ({
  type: FETCH_ADMIN_REQUEST_FAILURE,
  error
})

const fetchAdminQuery = `
  query fetchAdmin($adminId: ID!) {
    admin(id: $adminId) {
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
`;

export const fetchAdmin = (graphQLClient, adminId) => {
  return (dispatch) => {
    dispatch(fetchAdminRequest());
    return graphQLClient.query(fetchAdminQuery, {adminId}).then(data => {
        dispatch(fetchAdminRequestSuccess(data.admin))
    }).catch(err => {
      dispatch(fetchAdminRequestFailure(err))
    });
  }
}
