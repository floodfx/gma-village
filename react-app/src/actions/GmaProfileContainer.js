import client from '../graphql/client'

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
  query fetchGma($id: ID!) {
    gma(id: $id) {
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

export const fetchGma = (id) => {
  return (dispatch) => {
    dispatch(fetchGmaRequest());
    return client.query(fetchGmaQuery, {id: id}).then(data => {
      console.log('fetchGma data', data)
        dispatch(fetchGmaRequestSuccess(data.gma))
    }).catch(err => {
      dispatch(fetchGmaRequestFailure(err))
    });
  }
}
