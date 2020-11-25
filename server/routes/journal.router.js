const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const taskItemOne = req.body.taskItemOne;
  const taskItemTwo = req.body.taskItemTwo;
  const completeStatusItemOne = req.body.completeStatusItemOne;
  const completeStatusItemTwo = req.body.completeStatusItemTwo;
  const notesItemOne = req.body.notesItemOne;
  const notesItemTwo = req.body.notesItemTwo;
  const date = req.body.date;

  const queryText = `WITH ins AS (
    INSERT INTO "journal" ("task_item", "complete_status", "notes", "date")
    VALUES ($1, $2, $3, $4),
    ($5, $6, $7, $4) RETURNING id
  )
  SELECT array_agg(id) FROM ins;`;
  const queryArray = [
    taskItemOne,
    completeStatusItemOne,
    notesItemOne,
    date,
    taskItemTwo,
    completeStatusItemTwo,
    notesItemTwo,
  ];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      // console.log(dbResponse.rows[0].array_agg);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Problem storing Journal entry', err);
      res.sendStatus(500);
    });
});

module.exports = router;
