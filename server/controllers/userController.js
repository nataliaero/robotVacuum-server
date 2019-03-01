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
  const token = authenticate.getToken({_id: req.user._id});
  res.status = 200;
  res.json({success: true, token: token, status: 'You are logged in!'});
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