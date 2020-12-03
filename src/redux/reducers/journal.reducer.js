const journalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_JOURNALS':
      return action.payload;
    case 'SET_JOURNAL_NOTE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default journalReducer;
