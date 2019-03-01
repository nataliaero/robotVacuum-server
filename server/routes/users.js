const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const passport = require('passport');
const authenticate = require('../authenticate');

router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, userController.getUsers);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/checkJWTToken', userController.checkJWTToken);
router.get('/logout', userController.logout);

router.get('*', (req, res, next) => {
  const err = new Error('Page Not Found: '+ req.url);
  err.code = 404;
  next(err);
});

module.exports = router;