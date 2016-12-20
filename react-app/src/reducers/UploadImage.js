import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_REQUEST_SUCCESS,
  UPLOAD_IMAGE_REQUEST_FAILURE
} from '../actions/UploadImage'

const uploadImage = (state = {
  loading: true
}, action) => {
  switch(action.type) {
    case UPLOAD_IMAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case UPLOAD_IMAGE_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        image_url: action.image_url
      })
    }
    case UPLOAD_IMAGE_REQUEST_FAILURE: {
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
