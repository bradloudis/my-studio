import { combineReducers } from 'redux';

const studentListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STUDENTS':
      return action.payload;
    default:
      return state;
  }
};

const studentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_STUDENT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  studentListReducer,
  studentDetailsReducer,
});
