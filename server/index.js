const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const path = require('path');

const port = 3000;

const imgs = __dirname + '/images'; // __dirname gives absolute path to this location

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log('Express server listening'); //eslint-disable-line no-console
});