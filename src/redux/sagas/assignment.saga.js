import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAssignment(action) {
  try {
    const assignment = yield axios.get(`/api/assignment/${action.payload}`);
    yield put({
      type: 'SET_ASSIGNMENT',
      payload: assignment.data,
    });
  } catch (error) {
    console.log('Could not get the assignment!', error);
  }
}

function* saveAssignment(action) {
  try {
    yield axios.post('/api/assignment', action.payload);
  } catch (error) {
    console.log('Could not save new assignment!', error);
  }
}

function* assignmentSaga() {
  yield takeLatest('GET_ASSIGNMENT', getAssignment);
  yield takeLatest('SAVE_ASSIGNMENT', saveAssignment);
}

export default assignmentSaga;
