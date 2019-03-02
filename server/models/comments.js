const mongoose = require('../db');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Comment'
  //   }
  // ]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;