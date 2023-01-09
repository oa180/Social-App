const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Post must have a user.'],
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    userName: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);
const post = mongoose.model('post', postSchema);
module.exports = post;
