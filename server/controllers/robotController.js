const Robot = require('../models/robot');
const Comment = require('../models/comments');
const User = require('../models/user');

// method to get all robot vacuums
exports.getRobots = async (req, res) => {
  try {
    const robots = await Robot.find({})
      .populate({path: 'comments', model: 'Comment',
        populate: [{path: 'author', model: 'User'}, {path: 'comments', model: 'Comment'}]});
    res.status = 200;
    res.json(robots);
  }
  catch (err) {
    console.log('GET error at getAll: ', err); //eslint-disable-line no-console
    if (err.name==='MongoNetworkError') res.status(408).send({ error: 'Mongoose Network Error' });
    else res.status(500).send({ error: 'Server error' });
  }
};

// method to search for a robot vaccum based on the name
exports.searchRobots = async (req, res) => {
  try {
    const allRobots = await Robot.find()
      .populate({path: 'comments', model: 'Comment', populate: {path: 'author', model: 'User'}});

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

exports.updateLikesRobot = async (req, res) => {
  try {

    const robot = await Robot.findById(req.params.idRobot);
    if (robot) {

      let numlikes = robot.likes;
      if (req.body.liked) numlikes+=1;
      else numlikes-=1;
      await Robot.findOneAndUpdate({_id: req.params.idRobot}, {likes: numlikes});

      const user = await User.findById(req.params.idUser);
      if (user) {
        user.likes.push(req.params.idRobot);
        await user.save();
        res.status = 200;
        res.json(req.body);
      } else {
        res.status(404).send({ error: 'User not found!' });
      }

    } else {
      res.status(404).send({ error: 'Robot not found!' });
    }

  } catch (err) {
    console.log('UPDATE error at updateLikesRobot: ', err); //eslint-disable-line no-console
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
    const robot = await Robot.findById(req.params.id)
      .populate({path: 'comments', model: 'Comment', populate: {path: 'author', model: 'User'}});

    if (robot) {
      res.status = 200;
      res.json(robot);
    } else {
      res.status(404).send({ error: 'Robot not found!' });
    }
  } catch (err) {
    console.log('GET error at findOneRobot: ', err); //eslint-disable-line no-console
    if (err.name==='MongoNetworkError') {
      res.status(408).send({ error: 'Mongoose Network Error' });
    } else {
      res.status(500).send({ error: 'Server error at findOneRobot end-point' });
    }
  }
};

// get comments for each robot
exports.getComments = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id)
      .populate({path: 'comments', model: 'Comment',
        populate: [{path: 'author', model: 'User'}, {path: 'comments', model: 'Comment'}]});

    if (robot) {
      res.status = 200;
      res.json(robot.comments);
    } else {
      res.status(404).send({ error: 'Robot not found!' });
    }
  } catch (err) {
    console.log('GET error at getComments: ', err); //eslint-disable-line no-console
    if (err.name==='MongoNetworkError') {
      res.status(408).send({ error: 'Mongoose Network Error' });
    } else {
      res.status(500).send({ error: 'Server error at getComments end-point' });
    }
  }
};

//post a comment
exports.postComment = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id);

    if (robot) {

      const user = await User.findOne({username: req.body.name});

      if (user) {
        req.body.author = user._id;
      } else {
        res.status(404).send({ error: 'User not found!' });
      }

      dateNew = new Date(Date.now());
      req.body.date = dateNew.toLocaleString();

      const newReply = {
        author: req.body.author,
        date: req.body.date,
        name: req.body.name,
        comment: req.body.comment,
      };
      let newComment = new Comment(newReply);

      robot.comments.push(newComment._id);

      await newComment.save();
      await robot.save()
        .then((robot) => {
          Robot.findById(robot._id)
            .populate({path: 'comments', model: 'Comment', populate: {path: 'author', model: 'User'}})
            .then((robot) => {
              res.statusCode = 200;
              res.json(robot);
            });
        });

    } else {
      res.status(404).send({ error: 'Robot not found!' });
    }
  } catch (err) {
    console.log('POST error at postComment: ', err); //eslint-disable-line no-console
    if (err.name==='MongoNetworkError') {
      res.status(408).send({ error: 'Mongoose Network Error' });
    } else {
      res.status(500).send({ error: 'Server error at postComment end-point' });
    }
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