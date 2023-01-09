const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name.'],
    },
    email: {
      type: String,
      required: [true, 'User must have an email address.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Account must have a password.'],
    },
    profilePic: {
      type: String,
    },
    coverPic: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model('user', userSchema);
module.exports = User;
