const Comment = require('../models/comments');
const User = require('../models/user');
const Robot = require('../models/robot');

//method to reply a comment
exports.replyComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.idComment);
    if (comment) {

      const user = await User.findOne({username: req.body.name});

      if (user) {
        req.body.author = user._id;
      } else {
        res.status(404).send({ error: 'User not found!' });
      }

      dateNew = new Date(Date.now());
      req.body.date = dateNew.toLocaleString();
      if (!req.body.name) req.body.name = 'anonymous';

      const newReply = {
        author: req.body.author,
        date: req.body.date,
        name: req.body.name,
        comment: req.body.comment,
      };

      const reply = new Comment(newReply);

      comment.comments.push(reply._id);
      await comment.save();
      await reply.save();

      res.status = 200;
      res.json(reply);

    } else {
      res.status(404).send({ error: 'Comment not found!' });
    }
  } catch (err) {
    console.log('POST error at replyComment: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error while replying comment.' });
  }
};

// method to delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.idComment);
    if (comment) {
      if (comment.author.toString() === req.user._id.toString() || req.user.admin) {
        const comments = await Comment.find({});
        let commentAux;
        comments.forEach(subComment => {
          let idxComment = subComment.comments.indexOf(req.params.idComment);
          if (idxComment!==-1) {
            subComment.comments.splice(idxComment, 1);
            commentAux = subComment;
          }

        });
        if (commentAux) {
          await Comment(commentAux).save();
        }
        await Comment.deleteOne({_id: req.params.idComment});
        const robot = await Robot.findById(req.params.idRobot);
        if (robot) {
          let idxComment = robot.comments.indexOf(req.params.idComment);
          if (idxComment!==-1) {
            robot.comments.splice(idxComment, 1);
            await robot.save();
          }
        } else {
          res.status(404).send({ error: 'Robot not found!' });
        }


      } else {
        // res.status(401).send({ error: 'Unauthorized' });
      }



    } else {
      res.status(404).send({ error: 'Comment not found!' });
    }

    res.status = 200;
    res.json({id: req.params.idComment});
  } catch (err) {
    console.log('DELETE error at deleteComment: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error at Delete Comment end-point.' });
  }
};