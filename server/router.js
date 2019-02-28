const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/robots', controller.getRobots);
router.get('/search/:searchVal', controller.searchRobots);
router.get('/robot/:id', controller.findOneRobot);
router.get('/robots/top10', controller.findTop10);

router.post('/robots', controller.postRobot);
router.put('/robots/:id', controller.updateRobot);
router.delete('/robots/:id', controller.deleteRobot);

router.get('*', (req, res, next) => {
  const err = new Error('Page Not Found: '+ req.url);
  err.code = 404;
  next(err);
});

module.exports = router;