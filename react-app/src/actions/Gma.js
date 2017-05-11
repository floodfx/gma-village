import rp from 'request-promise';
import * as Types from './Types';
import { API_BASE } from '../util';

export const fetchGmaRequest = () => ({
  type: Types.FETCH_GMA_REQUEST
})

export const fetchGmaRequestSuccess = (gma) => ({
  type: Types.FETCH_GMA_REQUEST_SUCCESS,
  gma
})

export const fetchGmaRequestFailure = (error) => ({
  type: Types.FETCH_GMA_REQUEST_FAILURE,
  error
})

export const saveGmaUserRequest = () => ({
  type: Types.SAVE_GMA_USER_REQUEST
})

export const saveGmaUserRequestSuccess = (gma) => ({
  type: Types.SAVE_GMA_USER_REQUEST_SUCCESS,
  gma
})

export const saveGmaUserRequestFailure = () => ({
  type: Types.SAVE_GMA_USER_REQUEST_FAILURE
})

export const resetGmaUserRequest = () => ({
  type: Types.RESET_SAVE_GMA_USER_REQUEST
})

export const initGmasListRequest = () => ({
  type: Types.INIT_GMAS_LIST_REQUEST
})

export const initGmasListRequestSuccess = (gmas) => ({
  type: Types.INIT_GMAS_LIST_REQUEST_SUCCESS,
  gmas
})

export const initGmasListRequestFailure = (error) => ({
  type: Types.INIT_GMAS_LIST_REQUEST_FAILURE,
  error
})

export const filterGmasList = (filter) => ({
  type: Types.FILTER_GMAS_LIST,
  filter
})

export const resetGmaUser = () => {
  return (dispatch) => {
    dispatch(resetGmaUserRequest());
  }
}

export const fetchGmas = (access_token, active=undefined) => {
  return (dispatch) => {
    dispatch(initGmasListRequest());
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/gmas`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(initGmasListRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(initGmasListRequestFailure(err))
    });
  }
}

export const saveGmaUser = (access_token, gma) => {
  return (dispatch) => {
    dispatch(saveGmaUserRequest());
    const method = gma.id ? 'PUT' : 'POST';
    var uri = `${API_BASE}/usersapi/gmas`;
    if(method === 'PUT') {
      uri += `/${gma.id}`;
    }
    var options = {
      method,
      uri,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: gma,
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(saveGmaUserRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(saveGmaUserRequestFailure(err))
    });
  }
}


export const fetchGma = (access_token, gmaId) => {
  return (dispatch) => {
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/gmas/${gmaId}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(fetchGmaRequestSuccess(data))
      return data;
    }).catch(err => {
      dispatch(fetchGmaRequestFailure(err))
    });
  }
}
