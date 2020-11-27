const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

// random key generator for temporary key when new student is added by teacher
const randomNumber = require('../modules/randomKeyGenerator');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles GET student list for TEACHER
router.get('/get-students', rejectUnauthenticated, (req, res) => {
  const teacherId = req.user.id;
  const queryText = `SELECT "student_id", "first_name", "last_name", "email", "phone_number", "instrument", "profile_picture" FROM "user"
  JOIN "teacher_student" ON "user".id = "teacher_student".student_id
  WHERE "teacher_student".teacher_id = $1 AND "user".registration_status = 'done';`;

  pool
    .query(queryText, [teacherId])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log('Problem getting student list.', err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data for TEACHER
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register/teacher', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const accessLevel = 1;
  const registrationStatus = 'done';

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email, phone_number, access_level_id, registration_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`;
  pool
    .query(queryText, [
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      accessLevel,
      registrationStatus,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data for STUDENT (added by TEACHER)
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register/student', (req, res, next) => {
  // username is stubbed in by teacher when they add new student!
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const accessLevel = 2;
  const temporary_key = randomNumber();
  const registrationStatus = 'pending';

  const queryText = `INSERT INTO "user" (username, first_name, last_name, email,  access_level_id, temporary_key, registration_status)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
  pool
    .query(queryText, [
      username,
      firstName,
      lastName,
      email,
      accessLevel,
      temporary_key,
      registrationStatus,
    ])
    .then((result) => {
      // result.rows[0].id is the returned ID from the first query
      const newStudentId = result.rows[0].id;
      // req.user.id is the ID of the TEACHER
      const teacherId = req.user.id;

      const queryText = `INSERT INTO "teacher_student" (teacher_id, student_id)
        VALUES ($1, $2);`;

      // SECOND QUERY INSERTS INTO "teacher_student" table to establish relationship between teacher and new student they are adding
      pool
        .query(queryText, [teacherId, newStudentId])
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      // console.log(req.user.id);
      // res.sendStatus(200);
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles PUT request with updated user data for STUDENT (when they finish registration)
router.put('/register/student/:id', (req, res) => {
  const queryText = `UPDATE "user" 
  SET "username"= $1, "password"=$2, "phone_number"=$3, "instrument"=$4, "registration_status"='done' 
  WHERE "id"=$5;`;
  const queryArray = [
    req.body.username,
    encryptLib.encryptPassword(req.body.password),
    req.body.phone,
    req.body.instrument,
    req.params.id,
  ];

  pool
    .query(queryText, queryArray)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
