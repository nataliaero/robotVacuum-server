const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const config = require('./config');

//User.authenticate comes from Mongoose-passport. No need to write authentication func
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Creates an returns the token
exports.getToken= function (user) {
  return jwt.sign(user, config.secretKey, {expiresIn: 10800});
};

const opts = {};

// How to extract the JWT from incoming request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
    User.findOne({_id: jwt_payload._id}, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        // user found
        return done(null, user);
      } else {
        // user not found
        return done(null, false);
      }
    });
  }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin)
    next();
  else {
    res.status(403).send({ error: 'You are not authorized to perform this operation.' });
  }
};