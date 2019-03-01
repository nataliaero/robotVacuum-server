const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const passport = require('passport');
const authenticate = require('./authenticate');
const usersRouter = require('./routes/users');
const robotRouter = require('./routes/robots');

const port = 3000;

const imgs = __dirname + '/images'; // __dirname gives absolute path to this location

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users', usersRouter);
app.use('/robots', robotRouter);

app.listen(port, () => {
  console.log('Express server listening'); //eslint-disable-line no-console
});