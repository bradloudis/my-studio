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
    // console.log('JOURNAL DEEEEEEETS', journalNoteDetails);
    yield put({
      type: 'SET_JOURNAL_NOTE_DETAILS',
      payload: journalNoteDetails.data,
    });
  } catch (error) {
    console.log('Could not get journal note details!', error);
  }
}

// gets task items for specific journal item from DB
function* journalTaskItems(action) {
  try {
    const journalTaskItems = yield axios.get(
      `/api/journal/get-task/${action.payload}`
    );
    // console.log('JOURNAL Task', journalTaskItems);
    yield put({
      type: 'SET_JOURNAL_TASK_ITEMS',
      payload: journalTaskItems.data,
    });
  } catch (error) {
    console.log('Could not get journal task items', error);
  }
}

function* journalSaga() {
  yield takeLatest('GET_ALL_JOURNALS', getAllJournals);
  yield takeLatest('GET_JOURNAL_NOTE_DETAILS', journalNoteDetails);
  yield takeLatest('GET_JOURNAL_TASK_ITEMS', journalTaskItems);
}

export default journalSaga;
