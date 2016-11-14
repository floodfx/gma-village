import client from '../graphql/client'

export const INIT_GMAS_LIST_REQUEST = "INIT_GMAS_LIST_REQUEST"
export const INIT_GMAS_LIST_REQUEST_SUCCESS = "INIT_GMAS_LIST_REQUEST_SUCCESS"
export const INIT_GMAS_LIST_REQUEST_FAILURE = "INIT_GMAS_LIST_REQUEST_FAILURE"

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

export const fetchGmas = () => {
  return (dispatch) => {
    dispatch(initGmasListRequest());
    return client.query(`
        {
          gmas {
            gmas {
              id,
              first_name,
              last_name,
              phone,
              availabilities,
              neighborhood
            }
          }
        }
    `).then(data => {
        dispatch(initGmasListRequestSuccess(data.gmas.gmas))
    }).catch(err => {
      dispatch(initGmasListRequestFailure(err))
    });
  }
}
