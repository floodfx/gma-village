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
      first_name,
      last_name,
      phone,
      kind,
      active,
      availabilities,
      otherAvailability,
      careAges,
      careExperiences,
      otherCareExperience,
      careLocations,
      careTrainings,
      otherCareTraining,
      city,
      demeanors,
      otherDemeanor,
      neighborhood,
      otherNeighborhood,
      isAvailableOutsideNeighborhood,
      whyCareForKidsText,
      additionalInformationText,
      profilePhotoUrl
    }
  }
`;

export const fetchGma = (graphQLClient, gmaId) => {
  return (dispatch) => {
    dispatch(fetchGmaRequest());
    return graphQLClient.query(fetchGmaQuery, {gmaId}).then(data => {
        dispatch(fetchGmaRequestSuccess(data.gma))
    }).catch(err => {
      dispatch(fetchGmaRequestFailure(err))
    });
  }
}
