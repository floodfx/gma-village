import rp from 'request-promise';
import * as Types from './Types';
import { STAGE, API_BASE } from '../util';

export const initAdminListRequest = () => ({
  type: Types.INIT_ADMIN_LIST_REQUEST
})

export const initAdminListRequestSuccess = (admins) => ({
  type: Types.INIT_ADMIN_LIST_REQUEST_SUCCESS,
  admins
})

export const initAdminListRequestFailure = (error) => ({
  type: Types.INIT_ADMIN_LIST_REQUEST_FAILURE,
  error
})

export const fetchAdminRequest = () => ({
  type: Types.FETCH_ADMIN_REQUEST
})

export const fetchAdminRequestSuccess = (admin) => ({
  type: Types.FETCH_ADMIN_REQUEST_SUCCESS,
  admin
})

export const fetchAdminRequestFailure = (error) => ({
  type: Types.FETCH_ADMIN_REQUEST_FAILURE,
  error
})

export const saveAdminUserRequest = () => ({
  type: Types.SAVE_ADMIN_USER_REQUEST
})

export const saveAdminUserRequestSuccess = (admin) => ({
  type: Types.SAVE_ADMIN_USER_REQUEST_SUCCESS,
  admin
})

export const saveAdminUserRequestFailure = () => ({
  type: Types.SAVE_ADMIN_USER_REQUEST_FAILURE
})

export const resetAdminUserRequest = () => ({
  type: Types.RESET_SAVE_ADMIN_USER_REQUEST
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


export const fetchAdmins = (graphQLClient, active=undefined, limit=undefined, nextToken=undefined) => {
  return (dispatch) => {
    dispatch(initAdminListRequest());
    return graphQLClient.query(`
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
