const Robot = require('./models/robot');

exports.getRobots = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.status = 200;
    res.json(robots);
  }
  catch (err) {
    console.log('GET error at getAll'); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error' });
  }
};

exports.searchRobots = (req, res) => {

};

exports.postRobot = async (req, res) => {

  try {
    let robot = new Robot(req.body);
    res.body = await robot.save();
    res.status = 201;
    res.json(res.body);
  }
  catch (err) {
    console.log('POST error at postOne'); //eslint-disable-line no-console
    res.status(500).send({ error: 'Client error' });
  }

};

exports.updateRobot = (req, res) => {

};

exports.deleteRobot = (req, res) => {

};