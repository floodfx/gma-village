export const FETCH_PARENT_REQUEST = "FETCH_PARENT_REQUEST"
export const FETCH_PARENT_REQUEST_SUCCESS = "FETCH_PARENT_REQUEST_SUCCESS"
export const FETCH_PARENT_REQUEST_FAILURE = "FETCH_PARENT_REQUEST_FAILURE"

export const fetchParentRequest = () => ({
  type: FETCH_PARENT_REQUEST
})

export const fetchParentRequestSuccess = (parent) => ({
  type: FETCH_PARENT_REQUEST_SUCCESS,
  parent
})

export const fetchParentRequestFailure = (error) => ({
  type: FETCH_PARENT_REQUEST_FAILURE,
  error
})

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
