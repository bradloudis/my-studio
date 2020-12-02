const assignmentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ASSIGNMENT':
      return action.payload;
    default:
      return state;
  }
};

export default assignmentReducer;
