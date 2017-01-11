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

const prod = process.env.NODE_ENV === 'production'
var urlPrefix = prod ? 'https://gma-village-graphql-dev-dot-gma-village.appspot.com' : 'http://localhost:8080'

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
