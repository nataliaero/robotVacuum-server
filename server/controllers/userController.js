const Robot = require('../models/robot');
const User = require('../models/user');

const passport = require('passport');
const authenticate = require('../authenticate');

// method to login users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status = 200;
    res.json(users);
  }
  catch (err) {
    console.log('GET error at getUsers: ', err); //eslint-disable-line no-console
    if (err.name==='MongoNetworkError') res.status(408).send({ error: 'Mongoose Network Error' });
    else res.status(500).send({ error: 'Server error' });
  }
};

// method to login users
exports.login = async (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) res.status(500).send({ error: 'Server error' });

    else if (!user) {
      res.status = 401; //unauthorised
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }

    else {
      req.logIn(user, (err) => {
        if (err) {
          res.status = 401; //unauthorised
          res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in.'});
        }
      });
    }

    const token = authenticate.getToken({_id: req.user._id});
    res.status = 200;
    res.json({success: true, token: token, status: 'Login Successful!'});

  })(req, res);

};

// method to logout
exports.logout = (req, res) => {
  req.logout();
  res.status = 200;
  res.json({success: true, status: 'Logout Successful!'});
};

// method to register users
exports.register = (req, res) => {
  User.register(new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname}),
  req.body.password,
  (err, user) => {
    if (err) {
      console.log('POST error at register: ', err); //eslint-disable-line no-console
      res.status = 500;
      res.json({err: err});
    } else {
      passport.authenticate('local')(req, res, () => {
        res.status = 200;
        res.json({success: true, status: 'Registration successful!'});
      });
    }
  });
};

// check if token is valid or has expired
exports.checkJWTToken = (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) res.status(500).send({ error: 'Server error' });
    else if (!user) {
      res.status = 401;
      res.json({status: 'JWT invalid', sucess: false, err: info});
    }
    else {
      res.status = 200;
      res.json({status: 'JWT valid', success: true, user: user});
    }

  })(req, res);
};