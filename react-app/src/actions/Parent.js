import rp from 'request-promise';
import * as Types from './Types';
import { API_BASE } from '../util';

export const initParentListRequest = () => ({
  type: Types.INIT_PARENT_LIST_REQUEST
})

export const initParentListRequestSuccess = (parents) => ({
  type: Types.INIT_PARENT_LIST_REQUEST_SUCCESS,
  parents
})

export const initParentListRequestFailure = (error) => ({
  type: Types.INIT_PARENT_LIST_REQUEST_FAILURE,
  error
})

export const fetchParentRequest = () => ({
  type: Types.FETCH_PARENT_REQUEST
})

export const fetchParentRequestSuccess = (parent) => ({
  type: Types.FETCH_PARENT_REQUEST_SUCCESS,
  parent
})

export const fetchParentRequestFailure = (error) => ({
  type: Types.FETCH_PARENT_REQUEST_FAILURE,
  error
})

export const saveParentUserRequest = () => ({
  type: Types.SAVE_PARENT_USER_REQUEST
})

export const saveParentUserRequestSuccess = (parent) => ({
  type: Types.SAVE_PARENT_USER_REQUEST_SUCCESS,
  parent
})

export const saveParentUserRequestFailure = () => ({
  type: Types.SAVE_PARENT_USER_REQUEST_FAILURE
})

export const resetParentUserRequest = () => ({
  type: Types.RESET_SAVE_PARENT_USER_REQUEST
})

export const resetParentUser = () => {
  return (dispatch) => {
    dispatch(resetParentUserRequest());
  }
}

export const saveParentUser = (access_token, parent) => {
  return (dispatch) => {
    dispatch(saveParentUserRequest());
    const method = parent.id ? 'PUT' : 'POST';
    var uri = `${API_BASE}/usersapi/parents`;
    if(method === 'PUT') {
      uri += `/${parent.id}`;
    }
    var options = {
      method,
      uri,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: parent,
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(saveParentUserRequestSuccess(data));
      return;
    }).catch(err => {
      dispatch(saveParentUserRequestFailure(err))
    });
  }
}

export const fetchParent = (access_token, parentId) => {
  return (dispatch) => {
    dispatch(fetchParentRequest());
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/parents/${parentId}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(fetchParentRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(fetchParentRequestFailure(err))
    });
  }
}


export const fetchParents = (access_token, active=undefined, limit=undefined, nextToken=undefined) => {
  return (dispatch) => {
    dispatch(initParentListRequest());
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/parents`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(initParentListRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(initParentListRequestFailure(err))
    });
  }
}
