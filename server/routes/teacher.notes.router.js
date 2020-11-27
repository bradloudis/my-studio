const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/*----- SHOULD PROBABLY USE GET on /user/get-students for the specific teacher's list of students -----*/

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route handles teacher adding a note about a student
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const teacherId = req.user.id;
  const studentId = req.body.studentId;
  const note = req.body.note;

  const queryText = `INSERT INTO "teacher_notes" (teacher_id, student_id, note)
    VALUES ($1, $2, $3);`;
  const queryArray = [teacherId, studentId, note];

  pool
    .query(queryText, queryArray)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Problem adding teacher note', err);
      res.sendStatus(500);
    });
});

// PUT route updates the already created note
router.put('/:id', rejectUnauthenticated, (req, res) => {});

module.exports = router;
