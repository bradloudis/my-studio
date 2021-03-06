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

// gets all journals for teacher page
function* getJournalsTeacher(action) {
  try {
    const allJournals = yield axios.get(
      `/api/journal/teacher-get-all-journals/${action.payload}`
    );
    yield put({
      type: 'SET_ALL_JOURNALS',
      payload: allJournals.data,
    });
  } catch (error) {
    console.log('could not get the journal log for this student', error);
  }
}

// gets details for specific journal item from DB
function* journalNoteDetails(action) {
  try {
    const journalNoteDetails = yield axios.get(
      `/api/journal/get-note/${action.payload.journalId}`
    );
    yield put({
      type: 'GET_JOURNAL_TASK_ITEMS',
      payload: {
        assignmentId: action.payload.assignmentId,
        date: journalNoteDetails.data.date,
      },
    });
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
      `/api/journal/get-task/${action.payload.assignmentId}/${action.payload.date}`
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

// posts new journal item and calls to allJournals reducer
function* saveJournal(action) {
  try {
    // first POST handles the student's note
    yield axios.post('/api/journal/post-note', {
      notes: action.payload.notes,
      assignmentId: action.payload.assignmentId,
    });
    // second POST handles first task and complete status
    yield axios.post('/api/journal/post-tasks', {
      taskId: action.payload.taskItemOneId,
      completeStatus: action.payload.taskItemOneBool,
    });
    // third POST handles second task and complete status
    yield axios.post('/api/journal/post-tasks', {
      taskId: action.payload.taskItemTwoId,
      completeStatus: action.payload.taskItemTwoBool,
    });
  } catch (error) {
    console.log('Could not save new journal entry!', error);
  }
}

function* deleteJournalEntry(action) {
  try {
    // axios DELETE --> need to send payload in 'data object' !!
    // axios.delete(url, { data: { foo: "bar" }, headers: { "Authorization": "***" } });
    yield axios.delete('/api/journal/delete-journal-item', {
      data: action.payload,
    });
  } catch (error) {
    console.log('could not delete journal entry', error);
  }
}

function* journalSaga() {
  yield takeLatest('GET_ALL_JOURNALS', getAllJournals);
  yield takeLatest('GET_JOURNAL_NOTE_DETAILS', journalNoteDetails);
  yield takeLatest('GET_JOURNAL_TASK_ITEMS', journalTaskItems);
  yield takeLatest('SUBMIT_JOURNAL_ENTRY', saveJournal);
  yield takeLatest('DELETE_JOURNAL_ITEM', deleteJournalEntry);
  yield takeLatest('GET_JOURNALS_TEACHER', getJournalsTeacher);
}

export default journalSaga;
