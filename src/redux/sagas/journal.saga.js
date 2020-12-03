import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets all journal entries from DB for logged in student
function* getAllJournals() {
  try {
    const allJournals = yield axios.get('/api/journal/get-all-journals');
    yield put({
      type: 'SET_ALL_JOURNALS',
      payload: allJournals.data,
    });
  } catch (error) {
    console.log('could not get all journals', error);
  }
}

// gets details for specific journal item from DB
function* journalNoteDetails(action) {
  try {
    const journalNoteDetails = yield axios.get(
      `/api/journal/get-note/${action.payload}`
    );
    console.log('JOURNAL DEEEEEEETS', journalNoteDetails);
    yield put({
      type: 'SET_STUDENT_DETAILS',
      payload: journalNoteDetails.data,
    });
  } catch (error) {
    console.log('Could not get student details!', error);
  }
}

function* journalSaga() {
  yield takeLatest('GET_ALL_JOURNALS', getAllJournals);
  yield takeLatest('GET_JOURNAL_NOTE_DETAILS', journalNoteDetails);
}

export default journalSaga;
