const Post = require('../models/postModel');
const User = require('../models/userModel');
const response = require('../utils/response');

exports.createPost = async (req, res) => {
  try {
    const newPost = await new Post(req.body);
    await newPost.save();
    return res.status(200).json({
      status: 'success',
      data: newPost,
    });
  } catch (err) {
    return response(
      res,
      400,
      'fail',
      'Cannot create new post! Please try again later'
    );
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne(req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Post updated successfully!',
      });
    }
  } catch (err) {
    return res.status(200).json(err);
  }
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post && post.userId === req.body.userId) {
    try {
      await post.deleteOne();
      return res.status(200).json({
        status: 'success',
        message: 'Post deleted successfully!',
      });
    } catch (err) {
      return res.status(200).json(err);
    }
  }
};

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.id);
    if (post && user) {
      await post.updateOne({ $push: { likes: user.id } });
      return response(res, 200, 'success', 'liked');
    }
    return response(res, 400, 'fail', 'please try again later!');
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.timeline = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: user.id });
    // const friendsPosts = await Post.find({
    //   userId: user.followers.map(friendId => friendId),
    // });

    const friendsPosts = await Promise.all(
      user.followers.map(frindId => Post.find({ userId: frindId }))
    );
    // console.log(user);
    // console.log(userPosts);
    res.status(200).json({
      status: 'success',
      data: userPosts.concat(...friendsPosts),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPosts = async (req, res) => {
  const userQuery = req.query.user;
  const userDesc = req.query.desc;
  if (userQuery && userDesc) {
    console.log(userDesc);
    let posts = await Post.find({ userName: userQuery });
    posts = await Post.find({ desc: userDesc });
    res.status(200).json(posts);
  }
};
