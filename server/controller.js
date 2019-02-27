const Robot = require('./models/robot');

// method to get all robot vacuums
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

// method to search for a robot vaccum based on the name
exports.searchRobots = (req, res) => {

};


// method to post a new robot vacuum
exports.postRobot = async (req, res) => {
  try {
    let robot = new Robot(req.body);
    res.body = await robot.save();
    res.status = 201;
    res.json(res.body);
  }
  catch (err) {
    console.log('POST error at postOne'); //eslint-disable-line no-console
    res.status(500).send({ error: 'Client error. Check request body.' });
  }

};

// method to edit a robot vacuum
exports.updateRobot = async (req, res) => {
  try {
    await Robot.findOneAndUpdate({_id: req.params.id}, req.body);
    res.status = 200;
    res.json(req.body);
  } catch (err) {
    console.log('UPDATE error at updateRobot'); //eslint-disable-line no-console
    res.status(500).send({ error: 'Client error. Check request body.' });
  }
};

// method to delete a robot vacuum
exports.deleteRobot = async (req, res) => {
  try {
    await Robot.deleteOne({_id: req.params.id});
    res.status = 200;
    res.json({id: req.params.id});
  } catch (err) {
    console.log('DELETE error at deleteRobot'); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error. Delete Robot end-point.' });
  }
};