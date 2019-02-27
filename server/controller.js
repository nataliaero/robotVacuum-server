const Robot = require('./models/robot');

// method to get all robot vacuums
exports.getRobots = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.status = 200;
    res.json(robots);
  }
  catch (err) {
    console.log('GET error at getAll: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error' });
  }
};

// method to search for a robot vaccum based on the name
exports.searchRobots = async (req, res) => {
  try {
    const allRobots = await Robot.find();
    const selectedRobots = allRobots.filter(robot => {
      const name = robot.name.toLowerCase();
      return name.includes(req.params.searchVal.toLowerCase());
    });
    res.status = 200;
    res.json(selectedRobots);

  }  catch (err) {
    console.log('GET error at searchRobots: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error' });
  }
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
    console.log('POST error at postOne: ', err); //eslint-disable-line no-console
    res.status(400).send({ error: 'Client error. Check request body.' });
  }

};

// method to edit a robot vacuum
exports.updateRobot = async (req, res) => {
  try {
    await Robot.findOneAndUpdate({_id: req.params.id}, req.body);
    res.status = 200;
    res.json(req.body);
  } catch (err) {
    console.log('UPDATE error at updateRobot: ', err); //eslint-disable-line no-console
    res.status(400).send({ error: 'Client error. Check request body.' });
  }
};

// method to delete a robot vacuum
exports.deleteRobot = async (req, res) => {
  try {
    await Robot.deleteOne({_id: req.params.id});
    res.status = 200;
    res.json({id: req.params.id});
  } catch (err) {
    console.log('DELETE error at deleteRobot: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error at Delete Robot end-point.' });
  }
};

// method to find one robot based on one id
exports.findOneRobot = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id);
    res.status = 200;
    res.json(robot);
  } catch (err) {
    console.log('GET error at findOneRobot: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error at findOneRobot end-point' });
  }
};

// method to find the top 10 robots
exports.findTop10 = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.status = 200;
    res.json(robots);
  } catch (err) {
    console.log('GET error at findOneRobot: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error at findTop10 end-point.' });
  }
};