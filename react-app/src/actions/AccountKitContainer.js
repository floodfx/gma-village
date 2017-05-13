import rp from 'request-promise';
import * as Types from './Types';
import { STAGE, AUTH_BASE } from '../util';

export const initAccountKitRequest = () => ({
  type: Types.INIT_ACCOUNT_KIT_REQUEST
})

export const initAccountKitRequestSuccess = (accountKitInit) => ({
  type: Types.INIT_ACCOUNT_KIT_REQUEST_SUCCESS,
  appId: accountKitInit.appId,
  version: accountKitInit.version,
  csrf: accountKitInit.csrf
})

export const initAccountKitRequestFailure = (error) => ({
  type: Types.INIT_ACCOUNT_KIT_REQUEST_FAILURE,
  error
})

export const accountKitAuthRequest = (csrfNonce, authCode) => ({
  type: Types.ACCOUNT_KIT_AUTH_REQUEST,
  csrfNonce,
  authCode
})

export const accountKitAuthRequestSuccess = (user) => ({
  type: Types.ACCOUNT_KIT_AUTH_REQUEST_SUCCESS,
  user
})

export const accountKitAuthRequestFailure = (error) => ({
  type: Types.ACCOUNT_KIT_AUTH_REQUEST_FAILURE,
  error
})

export const initAccountKit = () => {
  return (dispatch) => {
    dispatch(initAccountKitRequest());
    var options = {
      method: 'GET',
      uri: `${AUTH_BASE}/accountkit/init`,
      json: true
    };
    rp(options)
    .then(data => {
        dispatch(initAccountKitRequestSuccess(data))
    }).catch(err => {
      dispatch(initAccountKitRequestFailure(err))
    });
  }
}

export const accountKitAuth = (csrfNonce, authCode) => {
  return (dispatch) => {
    dispatch(accountKitAuthRequest(csrfNonce, authCode));
    var options = {
      method: 'GET',
      uri: `https://auth.gmavillage.com/${STAGE}/accountkit/authorize`,
      qs: {
        csrfNonce,
        authCode
      },
      json: true
    };
    rp(options)
    .then(data => dispatch(accountKitAuthRequestSuccess(data)))
    .catch(err => {
      //console.log("err", err)
      dispatch(accountKitAuthRequestFailure({
        otherErrors: err
      }))
    });
  }
}
