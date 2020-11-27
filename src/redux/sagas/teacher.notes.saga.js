import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets teacher's note from DB
function* getNote(action) {
  try {
    const note = yield axios.get(`/api/teacher-notes/${action.payload}`);
    yield put({
      type: 'SET_NOTE',
      payload: note.data,
    });
  } catch (error) {
    console.log('Could not get the note!', error);
  }
}

function* noteSaga() {
  yield takeLatest('GET_NOTE', getNote);
}

export default noteSaga;
