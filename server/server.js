const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// s3 uploader var
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Route includes
const userRouter = require('./routes/user.router');
const assignmentRouter = require('./routes/assignment.router');
const journalRouter = require('./routes/journal.router');
const teacherNotesRouter = require('./routes/teacher.notes.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/assignment', assignmentRouter);
app.use('/api/journal', journalRouter);
app.use('/api/teacher-notes', teacherNotesRouter);

// AWS S3
app.use(
  '/s3',
  UploaderS3Router({
    bucket: 'my-studio', // name of s3 bucket
    region: 'us-east-2', // name of AWS Region
    headers: { 'Access-Control-Allow-Origin': '*' }, // optional
    ACL: 'public-read', // set to public-read
  })
);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
