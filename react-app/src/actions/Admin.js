import rp from 'request-promise';
import * as Types from './Types';
import { API_BASE } from '../util';

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

export const saveAdminUser = (access_token, admin) => {
  return (dispatch) => {
    dispatch(saveAdminUserRequest());
    const method = admin.id ? 'PUT' : 'POST';
    var uri = `${API_BASE}/usersapi/admins`;
    if(method === 'PUT') {
      uri += `/${admin.id}`;
    }
    var options = {
      method,
      uri,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: admin,
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(saveAdminUserRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(saveAdminUserRequestFailure(err))
    });
  }
}

export const fetchAdmin = (access_token, adminId) => {
  return (dispatch) => {
    dispatch(fetchAdminRequest());
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/admins/${adminId}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(fetchAdminRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(fetchAdminRequestFailure(err))
    });
  }
}


export const fetchAdmins = (access_token, active=undefined, limit=undefined, nextToken=undefined) => {
  return (dispatch) => {
    dispatch(initAdminListRequest());
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/admins`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(initAdminListRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(initAdminListRequestFailure(err))
    });
  }
}
