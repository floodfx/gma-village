import rp from 'request-promise';
import * as Types from './Types';
import { API_BASE } from '../util';

export const saveCareNeedUserRequest = () => ({
  type: Types.SAVE_CARE_NEED_REQUEST
})

export const saveCareNeedUserRequestSuccess = (careNeed) => ({
  type: Types.SAVE_CARE_NEED_REQUEST_SUCCESS,
  careNeed
})

export const saveCareNeedUserRequestFailure = () => ({
  type: Types.SAVE_CARE_NEED_REQUEST_FAILURE
})

export const resetCareNeedUserRequest = () => ({
  type: Types.RESET_SAVE_CARE_NEED_REQUEST
})

export const resetCareNeed = () => {
  return (dispatch) => {
    dispatch(resetCareNeedUserRequest());
  }
}

export const saveCareNeed = (access_token, careNeed) => {
  return (dispatch) => {
    dispatch(saveCareNeedUserRequest());
    var options = {
      method: 'POST',
      uri: `${API_BASE}/usersapi/careneeds`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: careNeed,
      json: true
    };
    rp(options)
    .then((data) => {
      dispatch(saveCareNeedUserRequestSuccess(data))
      return data
    }).catch(err => {
      dispatch(saveCareNeedUserRequestFailure(err))
    });
  }
}
