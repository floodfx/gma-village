import graphql from '../graphql/client'

export const SAVE_PARENT_USER_REQUEST = "SAVE_PARENT_USER_REQUEST"
export const SAVE_PARENT_USER_REQUEST_SUCCESS = "SAVE_PARENT_USER_REQUEST_SUCCESS"
export const SAVE_PARENT_USER_REQUEST_FAILURE = "SAVE_PARENT_USER_REQUEST_FAILURE"


export const saveParentUserRequest = () => ({
  type: SAVE_PARENT_USER_REQUEST
})

export const saveParentUserRequestSuccess = (parent) => ({
  type: SAVE_PARENT_USER_REQUEST_SUCCESS,
  parent
})

export const saveParentUserRequestFailure = () => ({
  type: SAVE_PARENT_USER_REQUEST_FAILURE
})

export const saveParentUser = (parent) => {
  return (dispatch) => {
    dispatch(saveParentUserRequest());
    return graphql.client.query(`
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
