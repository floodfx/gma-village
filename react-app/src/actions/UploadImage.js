import fetch from 'isomorphic-fetch';
import rp from 'request-promise';
import * as Types from './Types';
import { API_BASE } from '../util';

export const signedUrlRequest = (image) => ({
  type: Types.SIGNED_URL_REQUEST,
  image
})

export const signedUrlRequestSuccess = (signed_url) => ({
  type: Types.SIGNED_URL_REQUEST_SUCCESS,
  signed_url
})

export const signedUrlRequestFailure = (error) => ({
  type: Types.SIGNED_URL_REQUEST_FAILURE,
  error
})

export const preUploadImageRequest = (image) => ({
  type: Types.PRE_UPLOAD_IMAGE_REQUEST,
  image
})

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

export const signedUrl = (access_token, image) => {
  return (dispatch) => {
    dispatch(signedUrlRequest(image));
    var options = {
      method: 'GET',
      uri: `${API_BASE}/usersapi/signurl`,
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      qs: {
        type: image.type
      },
      json: true
    };
    rp(options)
    .then((data) => {
      dispatch(signedUrlRequestSuccess(data))
    })
    .catch(err => {
      dispatch(signedUrlRequestFailure(err))
    })
  }
}

const checkForErrors = (response) => {
  console.log(response.body)
  if (!response.ok) {
      throw Error(response);
  }
  return response;
}

export const uploadImage = (signed_url, access_token, image) => {
  return (dispatch) => {
    dispatch(uploadImageRequest());
    console.log("image", image)
    fetch(signed_url.url, {
      method: 'PUT',
      body: image
    })
    .then(checkForErrors)
    .then((response) => {
      dispatch(uploadImageRequestSuccess(signed_url))
    })
    .catch(err => {
      dispatch(uploadImageRequestFailure(err))
    })
  }
}
