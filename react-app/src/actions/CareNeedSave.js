export const SAVE_CARE_NEED_REQUEST = "SAVE_CARE_NEED_REQUEST"
export const SAVE_CARE_NEED_REQUEST_SUCCESS = "SAVE_CARE_NEED_REQUEST_SUCCESS"
export const SAVE_CARE_NEED_REQUEST_FAILURE = "SAVE_CARE_NEED_REQUEST_FAILURE"
export const RESET_SAVE_CARE_NEED_REQUEST = "RESET_SAVE_CARE_NEED_REQUEST"


export const saveCareNeedUserRequest = () => ({
  type: SAVE_CARE_NEED_REQUEST
})

export const saveCareNeedUserRequestSuccess = (careNeed) => ({
  type: SAVE_CARE_NEED_REQUEST_SUCCESS,
  careNeed
})

export const saveCareNeedUserRequestFailure = () => ({
  type: SAVE_CARE_NEED_REQUEST_FAILURE
})

export const resetCareNeedUserRequest = () => ({
  type: RESET_SAVE_CARE_NEED_REQUEST
})

export const resetCareNeed = () => {
  return (dispatch) => {
    dispatch(resetCareNeedUserRequest());
  }
}

export const saveCareNeed = (graphQLClient, careNeed, matchedGmas) => {
  return (dispatch) => {
    dispatch(saveCareNeedUserRequest());
    var gmas = matchedGmas.map(gma => {
      return {
        id: gma.id, 
        phone: gma.phone
      }
    });
    var input = {
      ...careNeed,
      gmas
    }
    console.log("input", input)
    return graphQLClient.query(`
      mutation saveCareNeedMutation($input: CareNeedInput!) {
        saveCareNeed(input:$input)
      }
    `, {input}).then(data => {
        dispatch(saveCareNeedUserRequestSuccess(data.saveCareNeed))
    }).catch(err => {
      dispatch(saveCareNeedUserRequestFailure(err))
    });
  }
}
