const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  reference: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

});

const Comment = mongoose.model('moovie', CommentSchema);
module.exports = Comment;
