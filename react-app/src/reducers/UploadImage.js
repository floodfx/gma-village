import * as Types from '../actions/Types';

export const uploadImage = (state = {
  loading: false
}, action) => {
  switch(action.type) {
    case Types.SIGNED_URL_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        image: action.image
      })
    }
    case Types.SIGNED_URL_REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        signed_url: action.signed_url
      })
    }
    case Types.SIGNED_URL_REQUEST_FAILURE: {
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      })
    }
    case Types.PRE_UPLOAD_IMAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: true,
        image: action.image
      })
    }
    case Types.UPLOAD_IMAGE_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      })
    }
    case Types.UPLOAD_IMAGE_REQUEST_SUCCESS: {
      // use browser to parse url
      var parser = document.createElement('a');
      parser.href = action.image_url.url;
      console.log("parser", parser)
      return Object.assign({}, state, {
        loading: false,
        image_url: parser.origin+parser.pathname
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
