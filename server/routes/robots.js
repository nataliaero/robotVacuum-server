const express = require('express');
const router = express.Router();
const robotController = require('../controllers/robotController');

const authenticate = require('../authenticate');

router.get('/', robotController.getRobots);
router.get('/search/:searchVal', robotController.searchRobots);
router.get('/robot/:id', robotController.findOneRobot);
router.get('/top10', robotController.findTop10);

router.get('/robot/:id/comments', robotController.getComments);
router.post('/robot/:id/comments', robotController.postComment);

router.get('/robot/:idRobot/:idUser/updateLikes', authenticate.verifyUser, robotController.getLikeRobot);
router.put('/robot/:idRobot/:idUser/updateLikes', authenticate.verifyUser, robotController.updateLikesRobot);

router.post('/', authenticate.verifyUser, authenticate.verifyAdmin, robotController.postRobot);
router.put('/:id', authenticate.verifyUser, authenticate.verifyAdmin, robotController.updateRobot);
router.delete('/:id', authenticate.verifyUser, authenticate.verifyAdmin, robotController.deleteRobot);

router.get('*', (req, res, next) => {
  const err = new Error('Page Not Found: '+ req.url);
  err.code = 404;
  next(err);
});

module.exports = router;