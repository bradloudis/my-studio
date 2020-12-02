import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// gets all journal entries from DB for logged in student
function* getAllJournals() {
  try {
    const allJournals = yield axios.get('/api/journal/all');
    yield put({
      type: 'SET_ALL_JOURNALS',
      payload: allJournals.data,
    });
  } catch (error) {
    console.log('could not get all journals', error);
  }
}

function* journalSaga() {
  yield takeLatest('GET_ALL_JOURNALS', getAllJournals);
}

export default journalSaga;
