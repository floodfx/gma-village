import client from '../graphql/client';
import fetch from 'isomorphic-fetch';


export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST"
export const UPLOAD_IMAGE_REQUEST_SUCCESS = "UPLOAD_IMAGE_REQUEST_SUCCESS"
export const UPLOAD_IMAGE_REQUEST_FAILURE = "UPLOAD_IMAGE_REQUEST_FAILURE"

export const uploadImageRequest = () => ({
  type: UPLOAD_IMAGE_REQUEST
})

export const uploadImageRequestSuccess = (image_url) => ({
  type: UPLOAD_IMAGE_REQUEST_SUCCESS,
  image_url
})

export const uploadImageRequestFailure = (error) => ({
  type: UPLOAD_IMAGE_REQUEST_FAILURE,
  error
})

const checkForErrors = (response) => {
  console.log(response.body)
  if (!response.ok) {
      throw Error(response);
  }
  return response;
}

export const uploadImage = (auth, image) => {
  return (dispatch) => {
    dispatch(uploadImageRequest());
    var data = new FormData()
    data.append('file', image)
    data.append('auth', JSON.stringify(auth))

    fetch('//localhost:8080/profilePhoto', {
      method: 'POST',
      body: data
    })
    .then(checkForErrors)
    .then(response => response.json())
    .then((json) => {
      console.log(json)
      dispatch(uploadImageRequestSuccess(json.image_url))
    })
    .catch(err => {
      dispatch(uploadImageRequestFailure(err))
    })
  }
}
