const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

const authenticate = require('../authenticate');


router.delete('/:idComment', authenticate.verifyUser, authenticate.verifyAdmin, commentController.deleteComment);


router.get('*', (req, res, next) => {
  const err = new Error('Page Not Found: '+ req.url);
  err.code = 404;
  next(err);
});

module.exports = router;