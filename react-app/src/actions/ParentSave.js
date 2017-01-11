export const SAVE_PARENT_USER_REQUEST = "SAVE_PARENT_USER_REQUEST"
export const SAVE_PARENT_USER_REQUEST_SUCCESS = "SAVE_PARENT_USER_REQUEST_SUCCESS"
export const SAVE_PARENT_USER_REQUEST_FAILURE = "SAVE_PARENT_USER_REQUEST_FAILURE"
export const RESET_SAVE_PARENT_USER_REQUEST = "RESET_SAVE_PARENT_USER_REQUEST"


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

export const resetParentUserRequest = () => ({
  type: RESET_SAVE_PARENT_USER_REQUEST
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
