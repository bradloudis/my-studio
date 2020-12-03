import { combineReducers } from 'redux';

const allJournalsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_JOURNALS':
      return action.payload;
    default:
      return state;
  }
};

const journalItemNoteDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_JOURNAL_NOTE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

const journalTaskItems = (state = [], action) => {
  switch (action.type) {
    case 'SET_JOURNAL_TASK_ITEMS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  allJournalsReducer,
  journalItemNoteDetails,
  journalTaskItems,
});
