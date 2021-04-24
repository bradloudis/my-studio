import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import studentSaga from './student.list.saga';
import noteSaga from './teacher.notes.saga';
import assignmentSaga from './assignment.saga';
import journalSaga from './journal.saga';
import profilePicSaga from './profile.picture.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    studentSaga(),
    noteSaga(),
    assignmentSaga(),
    journalSaga(),
    profilePicSaga(),
  ]);
}
