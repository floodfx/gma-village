import graphql from '../graphql/client'

export const INIT_GMAS_LIST_REQUEST = "INIT_GMAS_LIST_REQUEST"
export const INIT_GMAS_LIST_REQUEST_SUCCESS = "INIT_GMAS_LIST_REQUEST_SUCCESS"
export const INIT_GMAS_LIST_REQUEST_FAILURE = "INIT_GMAS_LIST_REQUEST_FAILURE"
export const FILTER_GMAS_LIST = "FILTER_GMAS_LIST"

export const initGmasListRequest = () => ({
  type: INIT_GMAS_LIST_REQUEST
})

export const initGmasListRequestSuccess = (gmas) => ({
  type: INIT_GMAS_LIST_REQUEST_SUCCESS,
  gmas
})

export const initGmasListRequestFailure = (error) => ({
  type: INIT_GMAS_LIST_REQUEST_FAILURE,
  error
})

export const filterGmasList = (filter) => ({
  type: FILTER_GMAS_LIST,
  filter
})


export const fetchGmas = (auth) => {
  return (dispatch) => {
    dispatch(initGmasListRequest());
    return graphql.client.query(`
      query fetchGmas($id: ID!, $phone: String!, $ak_access_token: String!, $ak_user_id:String!) {
        gmas(auth:{id:$id, phone:$phone, ak_access_token:$ak_access_token, ak_user_id:$ak_user_id}) {
          list {
            ... on Gma {
              id,
              first_name,
              last_name,
              phone,
              availabilities,
              neighborhood,
              careAges,
              careLocations,
              isAvailableOutsideNeighborhood
            }
          },
          nextToken
        }
      }
    `, auth).then(data => {
        dispatch(initGmasListRequestSuccess(data.gmas.list))
    }).catch(err => {
      dispatch(initGmasListRequestFailure(err))
    });
  }
}
