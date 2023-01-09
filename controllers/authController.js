const bycrypt = require('bcryptjs');
const User = require('../models/userModel');
const response = require('../utils/response');

exports.registerNewUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await newUser.save();
    response(res, 200, 'success', 'User created successfully!');
  } catch (err) {
    console.log(err);
    response(res, 400, 'fail', 'Cannot create new user!');
  }
};

exports.signIn = async (req, res) => {
  // 1) check if email&password exists in the body
  if (!req.body.email && !req.body.password)
    return response(
      res,
      400,
      'fail',
      'Please provide email and password!'
    );

  // 2) check if there is a user is exists
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && response(res, 401, 'fail', 'Wrongf email or password!');
    // 3) check if the password is coorrect
    const validPassword = await bycrypt.compare(
      req.body.password,
      user.password
    );
    // 4) login user
    validPassword
      ? response(res, 200, 'success', 'User signed in successfully!')
      : response(res, 401, 'fail', 'Wrong email or password!');
  } catch (err) {
    response(res, 401, 'fail', 'Wrong email or password!');
  }
};
