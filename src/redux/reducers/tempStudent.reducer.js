const tempStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TEMP_STUDENT':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default tempStudentReducer;
