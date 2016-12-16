import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_REQUEST_SUCCESS,
  IMAGE_UPLOAD_REQUEST_FAILURE
} from '../actions/UploadImage'

const uploadImage = (state = {
  loading: true
}, action) => {
  switch(action.type) {
    case IMAGE_UPLOAD_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case IMAGE_UPLOAD_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        image_url: action.image_url
      })
    }
    case IMAGE_UPLOAD_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    default:
      return state;
  }
}

export default uploadImage
