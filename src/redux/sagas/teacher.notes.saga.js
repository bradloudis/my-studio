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

function* saveNote(action) {
  try {
    yield console.log(action.payload);
    yield axios.post('/api/teacher-notes', action.payload);
    yield put({
      type: 'GET_NOTE',
      payload: action.payload.studentId,
    });
  } catch (error) {
    console.log('Could not save the note!', error);
  }
}

function* noteSaga() {
  yield takeLatest('GET_NOTE', getNote);
  yield takeLatest('SAVE_NOTE', saveNote);
}

export default noteSaga;
