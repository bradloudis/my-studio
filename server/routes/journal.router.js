const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route handles getting ALL journals for a specific student
 */
router.get('/all', (req, res) => {
  // GET route code here
});

/**
 * GET route handles getting one set of tasks for 'journal details' page
 */
router.get('/get-task', rejectUnauthenticated, (req, res) => {
  // GET route code here
});

/**
 * GET route handles getting note for 'journal details' page
 */
router.get('/get-note', rejectUnauthenticated, (req, res) => {
  // GET route code here
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
