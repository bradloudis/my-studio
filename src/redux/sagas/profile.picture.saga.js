import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateProfilePic(action) {
  try {
    // update s3 URL in DB
    yield axios.put('/api/user/update-profile-pic/', action.payload);
    // force client refresh
    yield put({
      type: 'FETCH_USER',
    });
  } catch (err) {
    console.log('Profile Picture - something went wrong!', err);
  }
}

function* profilePicSaga() {
  yield takeLatest('SET_IMAGE_URL', updateProfilePic);
}

export default profilePicSaga;
