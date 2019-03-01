const express = require('express');
const router = express.Router();
const robotController = require('../controllers/robotController');

const passport = require('passport');

router.get('/', robotController.getRobots);
router.get('/search/:searchVal', robotController.searchRobots);
router.get('/robot/:id', robotController.findOneRobot);
router.get('/top10', robotController.findTop10);

router.post('/', robotController.postRobot);
router.put('/:id', robotController.updateRobot);
router.delete('/:id', robotController.deleteRobot);

router.get('*', (req, res, next) => {
  const err = new Error('Page Not Found: '+ req.url);
  err.code = 404;
  next(err);
});

module.exports = router;