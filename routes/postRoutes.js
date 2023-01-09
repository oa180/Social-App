const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router
  .route('/')
  .post(postController.createPost)
  .get(postController.getPosts);
router.post('/:id/like', postController.like);
router
  .route('/:id')
  .post(postController.updatePost)
  .delete(postController.deletePost)
  .get(postController.timeline);
module.exports = router;
