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

function* assignmentSaga() {
  yield takeLatest('GET_ASSIGNMENT', getAssignment);
}

export default assignmentSaga;
