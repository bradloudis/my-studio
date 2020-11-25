import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
// handles "REGISTER" actions relating to teacher
function* registerTeacher(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    // TODO!! CHANGE ROUTE FOR TEACHER!!!
    yield axios.post('/api/user/register/teacher', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with teacher registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

// // handles "REGISTER" actions relating to student
function* registerStudent(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register/student', action.payload);
  } catch (error) {
    console.log('Error with student registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER_TEACHER', registerTeacher);
  yield takeLatest('REGISTER_STUDENT', registerStudent);
}

export default registrationSaga;
