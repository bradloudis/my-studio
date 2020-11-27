import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets list of students for a teacher
function* studentList() {
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

function* studentDetails(action) {
  try {
    const studentDetails = yield axios.get(
      `/api/user/student-details/${action.payload}`
    );
    yield put({
      type: 'SET_STUDENT_DETAILS',
      payload: studentDetails.data,
    });
  } catch (error) {
    console.log('Could not get student details!', error);
  }
}

function* studentSaga() {
  yield takeLatest('GET_STUDENTS', studentList);
  yield takeLatest('GET_STUDENT_DETAILS', studentDetails);
}

export default studentSaga;
