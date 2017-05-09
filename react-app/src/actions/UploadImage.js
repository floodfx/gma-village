import fetch from 'isomorphic-fetch';
import rp from 'request-promise';
import * as Types from './Types';
import { STAGE } from '../util';

export const uploadImageRequest = () => ({
  type: Types.UPLOAD_IMAGE_REQUEST
})

export const uploadImageRequestSuccess = (image_url) => ({
  type: Types.UPLOAD_IMAGE_REQUEST_SUCCESS,
  image_url
})

export const uploadImageRequestFailure = (error) => ({
  type: Types.UPLOAD_IMAGE_REQUEST_FAILURE,
  error
})

export const resetUploadImageRequest = () => ({
  type: Types.RESET_UPLOAD_IMAGE_REQUEST
})

export const resetUploadImage = () => {
  return (dispatch) => {
    dispatch(resetUploadImageRequest());
  }
}

const checkForErrors = (response) => {
  console.log(response.body)
  if (!response.ok) {
      throw Error(response);
  }
  return response;
}

const prod = process.env.NODE_ENV === 'production'
var urlPrefix = prod ? 'https://gma-village-graphql-prod-dot-gma-village.appspot.com' : 'http://localhost:8080'

export const uploadImage = (auth, image) => {
  return (dispatch) => {
    dispatch(uploadImageRequest());
    var data = new FormData()
    data.append('file', image)

    fetch(`${urlPrefix}/profilePhoto`, {
      method: 'POST',
      body: data,
      headers: auth ? {Authorization: `Bearer ${auth.ak_access_token}`} : {}
    })
    .then(checkForErrors)
    .then(response => response.json())
    .then((json) => {
      dispatch(uploadImageRequestSuccess(json.image_url))
    })
    .catch(err => {
      dispatch(uploadImageRequestFailure(err))
    })
  }
}
