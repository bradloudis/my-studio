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

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email, phone_number, access_level_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
  pool
    .query(queryText, [
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      accessLevel,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data for STUDENT
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register/student', (req, res, next) => {
  const username = req.body.username;
  const password = 'TBD';
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = 0;
  const instrument = 'TBD';
  const accessLevel = 2;
  const temporary_key = randomNumber();

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name, email, phone_number, instrument, access_level_id, temporary_key)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;
  pool
    .query(queryText, [
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      instrument,
      accessLevel,
      temporary_key,
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

router.put('/register/student/:id', (req, res) => {
  const queryText = `UPDATE "user" 
  SET "username"= $1, "password"=$2, "phone_number"=$3, "instrument"=$4 
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
