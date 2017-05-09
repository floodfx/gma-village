import * as Types from '../actions/Types';

export const uploadImage = (state = {
  loading: false
}, action) => {
  switch(action.type) {
    case Types.UPLOAD_IMAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.UPLOAD_IMAGE_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        image_url: action.image_url
      })
    }
    case Types.UPLOAD_IMAGE_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    case Types.RESET_UPLOAD_IMAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: false,
        image_url: undefined
      })
    }
    default:
      return state;
  }
}
