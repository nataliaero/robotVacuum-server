const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/robots', controller.getRobots);
router.get('/search/:searchVal', controller.searchRobots);
router.post('/robots', controller.postRobot);
router.put('/update/:id', controller.updateRobot);
router.delete('/delete/:id', controller.deleteRobot);

router.get('/robot/:id', controller.findOneRobot);
router.get('/top10', controller.findTop10);

router.get('*', (req, res, next) => {
  const err = new Error('Page Not Found');
  err.code = 404;
  next(err);
});

module.exports = router;