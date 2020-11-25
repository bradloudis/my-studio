const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route retrieves assignment, teacher_notes, and all associated tasks
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const teacherId = req.user.id;
  // note - LIMIT is 2 because teacher only has ability to add 2 tasks to a single assignment
  const queryText = `SELECT "teacher_notes", "task_item", "username", "student_id" FROM "assignment"
  JOIN "task" ON "assignment".id = "task".assignment_id
  JOIN "user" ON "assignment".student_id = "user".id
  WHERE "assignment".teacher_id = $1
  ORDER BY "assignment".id DESC LIMIT 2;`;

  pool
    .query(queryText, [teacherId])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log('Problem getting assignment!', err);
      res.sendStatus(500);
    });
});

/**
 * POST route handles teacher creating assignment
 * teacher_notes and student_notes should come over with default state of '' incase nothing is input by teacher/student
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const teacherId = req.user.id;
  const studentId = req.body.studentId;
  const teacherNotes = req.body.teacherNotes;

  const queryText = `INSERT INTO "assignment" (teacher_id, student_id, teacher_notes)
    VALUES ($1, $2, $3 ) RETURNING id;`;
  const queryArray = [teacherId, studentId, teacherNotes];

  pool
    .query(queryText, queryArray)
    .then((result) => {
      // result.rows[0].id is the returned ID from the first query
      const newAssignmentId = result.rows[0].id;
      const defaultCompleteStatus = 'false';
      const taskItemOne = req.body.taskItemOne;
      const taskItemTwo = req.body.taskItemTwo;

      const queryText = `INSERT INTO "task" (assignment_id, task_item, complete_status)
        VALUES ($1, $2, $3),
        ($4, $5, $6)`;

      const queryArray = [
        newAssignmentId,
        taskItemOne,
        defaultCompleteStatus,
        newAssignmentId,
        taskItemTwo,
        defaultCompleteStatus,
      ];

      pool
        .query(queryText, queryArray)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Problem adding assignment SECOND POOL', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('Problem adding assignment FIRST POOL.', err);
      res.sendStatus(500);
    });
});

module.exports = router;