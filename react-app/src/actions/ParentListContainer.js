import graphql from '../graphql/client'

export const INIT_PARENT_LIST_REQUEST = "INIT_PARENT_LIST_REQUEST"
export const INIT_PARENT_LIST_REQUEST_SUCCESS = "INIT_PARENT_LIST_REQUEST_SUCCESS"
export const INIT_PARENT_LIST_REQUEST_FAILURE = "INIT_PARENT_LIST_REQUEST_FAILURE"

export const initParentListRequest = () => ({
  type: INIT_PARENT_LIST_REQUEST
})

export const initParentListRequestSuccess = (parents) => ({
  type: INIT_PARENT_LIST_REQUEST_SUCCESS,
  parents
})

export const initParentListRequestFailure = (error) => ({
  type: INIT_PARENT_LIST_REQUEST_FAILURE,
  error
})


export const fetchParents = (active=undefined, limit=undefined, nextToken=undefined) => {
  return (dispatch) => {
    dispatch(initParentListRequest());
    return graphql.client.query(`
      query fetchParents($active: Boolean, $limit: Int, $nextToken: String) {
        parents(active: $active, limit: $limit, nextToken: $nextToken) {
          list {
            ... on Parent {
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
          },
          nextToken
        }
      }
    `,{active, limit, nextToken}).then(data => {
        dispatch(initParentListRequestSuccess(data.parents.list))
    }).catch(err => {
      dispatch(initParentListRequestFailure(err))
    });
  }
}
