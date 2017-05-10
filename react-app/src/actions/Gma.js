import rp from 'request-promise';
import * as Types from './Types';
import { API_BASE } from '../util';

export const fetchGmaRequest = () => ({
  type: Types.FETCH_GMA_REQUEST
})

export const fetchGmaRequestSuccess = (gma) => ({
  type: Types.FETCH_GMA_REQUEST_SUCCESS,
  gma
})

export const fetchGmaRequestFailure = (error) => ({
  type: Types.FETCH_GMA_REQUEST_FAILURE,
  error
})

export const saveGmaUserRequest = () => ({
  type: Types.SAVE_GMA_USER_REQUEST
})

export const saveGmaUserRequestSuccess = (gma) => ({
  type: Types.SAVE_GMA_USER_REQUEST_SUCCESS,
  gma
})

export const saveGmaUserRequestFailure = () => ({
  type: Types.SAVE_GMA_USER_REQUEST_FAILURE
})

export const resetGmaUserRequest = () => ({
  type: Types.RESET_SAVE_GMA_USER_REQUEST
})

export const initGmasListRequest = () => ({
  type: Types.INIT_GMAS_LIST_REQUEST
})

export const initGmasListRequestSuccess = (gmas) => ({
  type: Types.INIT_GMAS_LIST_REQUEST_SUCCESS,
  gmas
})

export const initGmasListRequestFailure = (error) => ({
  type: Types.INIT_GMAS_LIST_REQUEST_FAILURE,
  error
})

export const filterGmasList = (filter) => ({
  type: Types.FILTER_GMAS_LIST,
  filter
})

export const resetGmaUser = () => {
  return (dispatch) => {
    dispatch(resetGmaUserRequest());
  }
}

export const fetchGmas = (access_token, active=undefined) => {
  return (dispatch) => {
    dispatch(initGmasListRequest());
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/gmas`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      json: true
    };
    rp(options)
    .then(data => {
      dispatch(initGmasListRequestSuccess(data))
    }).catch(err => {
      dispatch(initGmasListRequestFailure(err))
    });
  }
}

export const saveGmaUser = (graphQLClient, gma) => {
  return (dispatch) => {
    dispatch(saveGmaUserRequest());
    return graphQLClient.query(`
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
          profilePhotoUrl
        }
      }
    `, {input: gma}).then(data => {
        dispatch(saveGmaUserRequestSuccess(data.saveGma))
    }).catch(err => {
      dispatch(saveGmaUserRequestFailure(err))
    });
  }
}


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
