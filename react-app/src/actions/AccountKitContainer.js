import client from '../graphql/client'

export const INIT_ACCOUNT_KIT_REQUEST = "INIT_ACCOUNT_KIT_REQUEST"
export const INIT_ACCOUNT_KIT_REQUEST_SUCCESS = "INIT_ACCOUNT_KIT_REQUEST_SUCCESS"
export const INIT_ACCOUNT_KIT_REQUEST_FAILURE = "INIT_ACCOUNT_KIT_REQUEST_FAILURE"
export const ACCOUNT_KIT_AUTH_REQUEST = "ACCOUNT_KIT_AUTH_REQUEST"
export const ACCOUNT_KIT_AUTH_REQUEST_SUCCESS = "ACCOUNT_KIT_AUTH_REQUEST_SUCCESS"
export const ACCOUNT_KIT_AUTH_REQUEST_FAILURE = "ACCOUNT_KIT_AUTH_REQUEST_FAILURE"

export const initAccountKitRequest = () => ({
  type: INIT_ACCOUNT_KIT_REQUEST
})

export const initAccountKitRequestSuccess = (accountKitInit) => ({
  type: INIT_ACCOUNT_KIT_REQUEST_SUCCESS,
  appId: accountKitInit.appId,
  version: accountKitInit.version,
  csrf: accountKitInit.csrf
})

export const initAccountKitRequestFailure = (error) => ({
  type: INIT_ACCOUNT_KIT_REQUEST_FAILURE,
  error
})

export const accountKitAuthRequest = () => ({
  type: ACCOUNT_KIT_AUTH_REQUEST
})

export const accountKitAuthRequestSuccess = (user) => ({
  type: ACCOUNT_KIT_AUTH_REQUEST_SUCCESS,
  user
})

export const accountKitAuthRequestFailure = (error) => ({
  type: ACCOUNT_KIT_AUTH_REQUEST_FAILURE,
  error
})


export const initAccountKit = () => {
  return (dispatch) => {
    dispatch(initAccountKitRequest());
    return client.query(`
        {
          accountKitInit {
            appId,
            version,
            csrf
          }
        }
    `).then(data => {
        dispatch(initAccountKitRequestSuccess(data.accountKitInit))
    }).catch(err => {
      dispatch(initAccountKitRequestFailure(err))
    });
  }
}

export const accountKitAuth = (csrfNonce, authCode) => {
  return (dispatch) => {
    dispatch(accountKitAuthRequest());
    return client.query(`
      mutation auth($csrfNonce: String!, $authCode: String!){
        accountKitAuth(csrfNonce:$csrfNonce, authCode:$authCode) {
          ... on Admin {
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
            roles
          }
          ... on Gma {
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
          ... on Parent {
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
            member_since_timestamp
          }
        }
      }
    `, {csrfNonce, authCode}).then(data => {
        console.log("accountKitAuth", data)
        dispatch(accountKitAuthRequestSuccess(data.accountKitAuth))
    }).catch(err => {
      dispatch(accountKitAuthRequestFailure(err))
    });
  }
}