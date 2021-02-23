import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateProfilePic(action) {
  try {
    // update s3 URL in DB

    console.log(action.payload);
    yield axios.put('/api/user/update-profile-pic/', action.payload);
  } catch (err) {
    console.log('Profile Picture - something went wrong!', err);
  }
}

function* profilePicSaga() {
  yield takeLatest('SET_IMAGE_URL', updateProfilePic);
}

export default profilePicSaga;
