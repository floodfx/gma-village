import graphql from '../graphql/client'

export const INIT_ADMIN_LIST_REQUEST = "INIT_ADMIN_LIST_REQUEST"
export const INIT_ADMIN_LIST_REQUEST_SUCCESS = "INIT_ADMIN_LIST_REQUEST_SUCCESS"
export const INIT_ADMIN_LIST_REQUEST_FAILURE = "INIT_ADMIN_LIST_REQUEST_FAILURE"

export const initAdminListRequest = () => ({
  type: INIT_ADMIN_LIST_REQUEST
})

export const initAdminListRequestSuccess = (admins) => ({
  type: INIT_ADMIN_LIST_REQUEST_SUCCESS,
  admins
})

export const initAdminListRequestFailure = (error) => ({
  type: INIT_ADMIN_LIST_REQUEST_FAILURE,
  error
})

export const fetchAdmins = (active=undefined, limit=undefined, nextToken=undefined) => {
  return (dispatch) => {
    dispatch(initAdminListRequest());
    return graphql.client.query(`
      query fetchAdmin($active: Boolean, $limit: Int, $nextToken: String) {
        admins(active: $active, limit: $limit, nextToken: $nextToken) {
          list {
            ... on Admin {
              id,
              first_name,
              last_name,
              phone,
              active,
              profilePhotoUrl,
              roles
            }
          },
          nextToken
        }
      }
    `,{active, limit, nextToken}).then(data => {
        dispatch(initAdminListRequestSuccess(data.admins.list))
    }).catch(err => {
      dispatch(initAdminListRequestFailure(err))
    });
  }
}
