import { takeLatest, select, put } from 'redux-saga/effects';
import * as Types from '../actions/Types';
import {
  signedUrl,
  uploadImage
} from '../actions/UploadImage';

const getUploadImage = (state) => state.uploadImage
const getAuth = (state) => state.auth

export function* onPreUploadImage() {
  yield takeLatest(Types.PRE_UPLOAD_IMAGE_REQUEST, fetchSignedUrl)
}

export function* fetchSignedUrl() {
  const uploadImage = yield select(getUploadImage)
  const auth = yield select(getAuth)
  yield put(signedUrl(auth.user.account_kit_access_token, uploadImage.image))
}

export function* onSignedUrlSuccess() {
  yield takeLatest(Types.SIGNED_URL_REQUEST_SUCCESS, putUploadImage)
}

export function* putUploadImage() {
  const uploadImageData = yield select(getUploadImage)
  const auth = yield select(getAuth)
  yield put(uploadImage(uploadImageData.signed_url, auth.user.account_kit_access_token, uploadImageData.image))
}

export default function* sagas() {
  yield [
    onPreUploadImage(),
    onSignedUrlSuccess(),
  ]
}
