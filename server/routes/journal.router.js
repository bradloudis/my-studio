const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { query } = require('../modules/pool');

/**
 * GET route handles getting ALL journals for a specific student
 */
router.get('/all', (req, res) => {
  const queryText = `SELECT * FROM "journal"
  JOIN "assignment" ON "journal".assignment_id="assignment".id
  WHERE "journal".user_id=$1
  ORDER BY "journal".id DESC;`;

  pool
    .query(queryText, [req.user.id])
    .then((dbResponse) => {
      console.log(dbResponse.rows);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log('could not get all journals', err);
      res.sendStatus(500);
    });
});

/**
 * GET route handles getting the pair of tasks for 'journal details' page
 */
router.get('/get-task', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "journal"
  JOIN "task" ON "task".id="journal".task_id
  JOIN "assignment" ON "task".assignment_id="assignment".id
  WHERE "journal".user_id=$1 AND "assignment".id=$2;`;

  const studentId = req.user.id;
  const assignmentId = req.body.assignmentId;

  pool
    .query(queryText, [studentId, assignmentId])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log('problem getting pair of tasks', err);
      res.sendStatus(500);
    });
});

/**
 * GET route handles getting note for 'journal details' page
 */
router.get('/get-note', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "journal"
  JOIN "assignment" ON "journal".assignment_id="assignment".id
  WHERE "journal".user_id=$1 AND "assignment".id=$2;`;

  const studentId = req.user.id;
  const assignmentId = req.body.assignmentId;

  pool
    .query(queryText, [studentId, assignmentId])
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log('problem getting student note', err);
      res.sendStatus(500);
    });
});

/**
 * POST route handles adding task and complete status to DB
 */
router.post('/post-tasks', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

/**
 * POST route handles adding student's notes to DB
 */
router.post('/post-note', rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;
