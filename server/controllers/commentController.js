

// method to delete a comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({_id: req.params.id});
    res.status = 200;
    res.json({id: req.params.id});
  } catch (err) {
    console.log('DELETE error at deleteComment: ', err); //eslint-disable-line no-console
    res.status(500).send({ error: 'Server error at Delete Comment end-point.' });
  }
};