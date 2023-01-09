const express = require('express');
const User = require('../models/userModel');
const response = require('../utils/response');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Register User
router.get('/', userController.getAllUsers);
router.patch('/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);
router.patch('/:id/follow', userController.followUser);
router.post('/register', authController.registerNewUser);
router.post('/signin', authController.signIn);
module.exports = router;
