const journalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_JOURNALS':
      return action.payload;
    default:
      return state;
  }
};

export default journalReducer;
