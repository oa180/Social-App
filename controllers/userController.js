const { findByIdAndUpdate } = require('../models/userModel');
const User = require('../models/userModel');
const response = require('../utils/response');

exports.updateUser = async (req, res) => {
  if (req.params.id === req.body.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      user.save();
      response(
        res,
        200,
        'success',
        'User data updated successfully!'
      );
    } catch (err) {
      response(res, 400, 'fail', 'Cannot update users data!');
    }
  }
};
exports.deleteUser = async (req, res) => {
  const admin = await User.findOne({ _id: req.params.id });
  if (!admin || !admin.isAdmin) {
    return response(
      res,
      400,
      'fail',
      'You donot have permision to perform this action!'
    );
  }
  try {
    const user = await User.findById(req.body.id);
    if (user) {
      await User.findByIdAndDelete(req.body.id);
      return response(
        res,
        200,
        'success',
        'User deleted successfully!'
      );
    }
    return response(res, 400, 'fail', 'Cannot delete users data!');
  } catch (err) {
    return response(res, 400, 'fail', 'Cannot delete users data!');
  }
};

exports.followUser = async (req, res) => {
  if (req.params.id !== req.body.id) {
    try {
      const currentUser = await User.findById(req.params.id);
      const user = await User.findById(req.body.id);
      if (!currentUser.followers.includes(req.body.id)) {
        await currentUser.updateOne({
          $push: { followers: req.body.id },
        });
        await user.updateOne({
          $push: { followings: req.params.id },
        });
      } else {
        await currentUser.updateOne({
          $pull: { followers: req.body.id },
        });
        await user.updateOne({
          $pull: { followings: req.params.id },
        });
        return response(
          res,
          200,
          'success',
          'You unfollowed this user!'
        );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return response(
      res,
      200,
      'success',
      'You are now following this user!'
    );
  }
  return response(res, 400, 'fail', 'Cannot follow this user!');
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (err) {
    return response(res, 400, 'fail', 'Cannot retreive users!');
  }
};
