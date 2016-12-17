import graphql from '../graphql/client'

export const FETCH_GMA_REQUEST = "FETCH_GMA_REQUEST"
export const FETCH_GMA_REQUEST_SUCCESS = "FETCH_GMA_REQUEST_SUCCESS"
export const FETCH_GMA_REQUEST_FAILURE = "FETCH_GMA_REQUEST_FAILURE"

export const fetchGmaRequest = () => ({
  type: FETCH_GMA_REQUEST
})

export const fetchGmaRequestSuccess = (gma) => ({
  type: FETCH_GMA_REQUEST_SUCCESS,
  gma
})

export const fetchGmaRequestFailure = (error) => ({
  type: FETCH_GMA_REQUEST_FAILURE,
  error
})

const fetchGmaQuery = `
  query fetchGma($id: ID!, $phone: String!, $ak_access_token: String!, $ak_user_id:String!, $gmaId: ID!) {
    gma(auth:{id:$id, phone:$phone, ak_access_token:$ak_access_token, ak_user_id:$ak_user_id}, id: $gmaId) {
      id,
      phone,
      first_name,
      availabilities,
      careAges,
      neighborhood,
      careLocations,
      careExperiences,
      careTrainings,
      demeanors,
      additionalInformationText,
      whyCareForKidsText
    }
  }
`;

export const fetchGma = (auth, id) => {
  return (dispatch) => {
    dispatch(fetchGmaRequest());
    let input = Object.assign(auth, {gmaId: id})
    return graphql.client.query(fetchGmaQuery, input).then(data => {
        dispatch(fetchGmaRequestSuccess(data.gma))
    }).catch(err => {
      dispatch(fetchGmaRequestFailure(err))
    });
  }
}
