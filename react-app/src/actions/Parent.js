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

export const saveParentUser = (graphQLClient, parent) => {
  return (dispatch) => {
    dispatch(saveParentUserRequest());
    return graphQLClient.query(`
      mutation saveParentMutation($input: ParentInput!) {
        saveParent(input:$input) {
          id,
          first_name,
          last_name,
          phone,
          kind,
          active,
          last_login_timestamp,
          created_on_timestamp,
          member_since_timestamp,
          profilePhotoUrl,
          neighborhood,
          otherNeighborhood,
          kids {
            first_name,
            birthday
          }
        }
      }
    `, {input: parent}).then(data => {
        dispatch(saveParentUserRequestSuccess(data.saveParent))
    }).catch(err => {
      dispatch(saveParentUserRequestFailure(err))
    });
  }
}

const fetchParentQuery = `
  query fetchParent($parentId: ID!) {
    parent(id: $parentId) {
      id,
      first_name,
      last_name,
      phone,
      kind,
      active,
      last_login_timestamp,
      created_on_timestamp,
      member_since_timestamp,
      profilePhotoUrl,
      neighborhood,
      otherNeighborhood,
      kids {
        first_name,
        birthday
      }
    }
  }
`;

export const fetchParent = (graphQLClient, parentId) => {
  return (dispatch) => {
    dispatch(fetchParentRequest());
    return graphQLClient.query(fetchParentQuery, {parentId}).then(data => {
        dispatch(fetchParentRequestSuccess(data.parent))
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
