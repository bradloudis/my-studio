const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

// random key generator for temporary key when new student is added by teacher
const { generateUUID } = require('../services/uuid.service');

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

// Handles GET student details for Student Details Page
router.get('/student-details/:id', rejectUnauthenticated, (req, res) => {
  const queryText =
    'SELECT "first_name", "last_name", "email", "phone_number", "instrument", "profile_picture" FROM "user" WHERE id=$1';

  pool
    .query(queryText, [req.params.id])
    .then((dbResponse) => {
      res.send(dbResponse.rows[0]);
    })
    .catch((err) => {
      console.log('Problem getting student details.', err);
      res.sendStatus(500);
    });
});

// Handles POST request with new user data for TEACHER
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register/teacher', (req, res, next) => {
  const { username, firstName, lastName, email, phone } = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  // accessLevel is set at 1 for a teacher account
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
router.post('/register/student', rejectUnauthenticated, (req, res, next) => {
  const queryForTeacherAccessLevel = `SELECT * FROM "user"
  JOIN "access_level" ON "user".access_level_id = "access_level".id
  WHERE "user".id = $1;`;

  pool
    .query(queryForTeacherAccessLevel, [req.user.id])
    .then((dbResponse) => {
      const teacherWithAccessLevel = dbResponse.rows[0];

      if (teacherWithAccessLevel.name === 'teacher') {
        // create temporary registration key for the new student
        const tempKey = generateUUID();

        // create temporary new student
        const { firstName, lastName, email } = req.body;

        // accessLevel is set at 2 for a student account
        const accessLevel = 2;
        const registrationStatus = 'pending';

        const queryCreateTempStudent = `INSERT INTO "user" (first_name, last_name, email,  access_level_id, temporary_key, registration_status)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
        const queryArray = [
          firstName,
          lastName,
          email,
          accessLevel,
          tempKey,
          registrationStatus,
        ];

        pool
          .query(queryCreateTempStudent, queryArray)
          .then((dbResponse) => {
            // dbResponse.rows[0].id is the returned ID from the first query
            const newStudentId = dbResponse.rows[0].id;
            // req.user.id is the ID of the teacher
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
                console.log('problem during second query. ', err);
                res.sendStatus(500);
              });
          })
          .catch((err) => {
            console.log(
              'problem inserting new student during first query. ',
              err
            );
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log('could not access teacher role', err);
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
