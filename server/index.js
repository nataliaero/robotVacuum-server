const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const passport = require('passport');
const usersRouter = require('./routes/users');
const robotRouter = require('./routes/robots');
const commentRouter = require('./routes/comments');

const http = require('http');
const https = require('https');
const fs = require('fs');

var port = process.env.PORT || '3000';
app.set('port', port);
app.set('secPort', 3443); //port for https

app.use(cors());

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key'
//   );
//   res.header('Access-Control-Allow-Credentials', 'true');
//   if ('OPTIONS' === req.method) {
//     res.sendStatus(200);
//   }
//   else {
//     next();
//   }
// });

//redirect all requests to secure
// app.all('*', (req, res, next) => {
//   if (req.secure) next();
//   else {
//     console.log('NO SECURE')
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });


app.use(express.json());
app.use(passport.initialize());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users', usersRouter);
app.use('/robots', robotRouter);
app.use('/comments', commentRouter);

// http server
const server = http.createServer(app);
server.listen(port, () => {
  console.log('Express server listening'); //eslint-disable-line no-console
});

// // https server configuration
// const options = {
//   key: fs.readFileSync(__dirname + '/certificates/private.key'),
//   cert: fs.readFileSync(__dirname + '/certificates/certificate.pem')
// };

// // https server
// const secServer = https.createServer(options, app);
// secServer.listen(app.get('secPort'), () => {
//   console.log('Express secure server listening'); //eslint-disable-line no-console
// });