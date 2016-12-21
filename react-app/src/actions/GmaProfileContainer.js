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
  query fetchGma($gmaId: ID!) {
    gma(id: $gmaId) {
      id,
      phone,
      first_name,
      availabilities,
      otherAvailability,
      careAges,
      neighborhood,
      otherNeighborhood,
      careLocations,      
      careExperiences,
      otherCareExperience,
      careTrainings,
      otherCareTraining,
      demeanors,
      otherDemeanor,
      additionalInformationText,
      whyCareForKidsText,
      profilePhotoUrl
    }
  }
`;

export const fetchGma = (gmaId) => {
  return (dispatch) => {
    dispatch(fetchGmaRequest());
    return graphql.client.query(fetchGmaQuery, {gmaId}).then(data => {
        dispatch(fetchGmaRequestSuccess(data.gma))
    }).catch(err => {
      dispatch(fetchGmaRequestFailure(err))
    });
  }
}
