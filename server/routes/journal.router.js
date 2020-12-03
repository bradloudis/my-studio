const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route handles getting ALL journals for a specific student
 */
router.get('/get-all-journals', (req, res) => {
  const queryText = `SELECT * FROM "journal"
  JOIN "assignment" ON "journal".assignment_id="assignment".id
  WHERE "journal".user_id=$1
  ORDER BY "journal".id DESC;`;

  pool
    .query(queryText, [req.user.id])
    .then((dbResponse) => {
      // console.log(dbResponse.rows);
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
router.get('/get-task/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "journal"
  JOIN "task" ON "task".id="journal".task_id
  JOIN "assignment" ON "task".assignment_id="assignment".id
  WHERE "journal".user_id=$1 AND "assignment".id=$2;`;

  const studentId = req.user.id;

  pool
    .query(queryText, [studentId, req.params.id])
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
router.get('/get-note/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "journal"
  JOIN "assignment" ON "journal".assignment_id="assignment".id
  WHERE "journal".user_id=$1 AND "assignment".id=$2;`;

  const studentId = req.user.id;

  pool
    .query(queryText, [studentId, req.params.id])
    .then((dbResponse) => {
      res.send(dbResponse.rows[0]);
    })
    .catch((err) => {
      console.log('problem getting student note', err);
      res.sendStatus(500);
    });
});

/**
 * POST route handles adding task and complete status to DB
 * hmmmmmm this query will work for one task BUT how will i handle both tasks?? even if its 2 calls??
 * need to figure that out from client side or is it going to be two separate API endpoints??
 */
router.post('/post-tasks', rejectUnauthenticated, (req, res) => {
  const taskId = req.body.taskId;
  const completeStatus = req.body.completeStatus;
  const date = req.body.date;
  const studentId = req.user.id;

  queryText = `INSERT INTO "journal" (task_id, complete_status, date, user_id)
  VALUES ($1, $2, $3, $4);`;

  pool
    .query(queryText, [taskId, completeStatus, date, studentId])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('problem adding task to journal', err);
      res.sendStatus(500);
    });
});

/**
 * POST route handles adding student's notes to DB
 */
router.post('/post-note', rejectUnauthenticated, (req, res) => {
  const notes = req.body.notes;
  const date = req.body.date;
  const studentId = req.user.id;
  const assignmentId = req.body.assignmentId;

  queryText = `INSERT INTO "journal" (notes, date, user_id, assignment_id)
  VALUES ($1, $2, $3, $4);`;

  pool
    .query(queryText, [notes, date, studentId, assignmentId])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('problem saving journal note to DB', err);
      res.sendStatus(500);
    });
});

module.exports = router;
