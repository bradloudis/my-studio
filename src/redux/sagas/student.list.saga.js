import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets list of students for a teacher
function* student() {
  try {
    const studentList = yield axios.get('/api/user/get-students');
    yield put({
      type: 'SET_STUDENTS',
      payload: studentList.data,
    });
  } catch (error) {
    console.log('Could not get student list!', error);
  }
}

function* studentSaga() {
  yield takeLatest('GET_STUDENTS', student);
}

export default studentSaga;
