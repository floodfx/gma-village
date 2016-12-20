import graphql from '../graphql/client'

export const SAVE_GMA_USER_REQUEST = "SAVE_GMA_USER_REQUEST"
export const SAVE_GMA_USER_REQUEST_SUCCESS = "SAVE_GMA_USER_REQUEST_SUCCESS"
export const SAVE_GMA_USER_REQUEST_FAILURE = "SAVE_GMA_USER_REQUEST_FAILURE"


export const saveGmaUserRequest = () => ({
  type: SAVE_GMA_USER_REQUEST
})

export const saveGmaUserRequestSuccess = (gma) => ({
  type: SAVE_GMA_USER_REQUEST_SUCCESS,
  gma
})

export const saveGmaUserRequestFailure = () => ({
  type: SAVE_GMA_USER_REQUEST_FAILURE
})

export const saveGmaUser = (gma) => {
  return (dispatch) => {
    dispatch(saveGmaUserRequest());
    return graphql.client.query(`
      mutation saveGmaMutation($input: GmaInput!) {
        saveGma(input:$input) {
          id,
          first_name,
          last_name,
          phone,
          kind,
          active,
          ak_access_token,
          ak_user_id,
          ak_token_refresh_interval_sec,
          last_login_timestamp,
          created_on_timestamp,
          member_since_timestamp,
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
        }
      }
    `, {input: gma}).then(data => {
        dispatch(saveGmaUserRequestSuccess(data.gma))
    }).catch(err => {
      dispatch(saveGmaUserRequestFailure(err))
    });
  }
}
