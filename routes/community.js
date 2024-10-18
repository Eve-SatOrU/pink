const express = require('express');
const communityController = require('../controllers/communityController');
const router = express.Router();

router.post('/stories', communityController.createStory);
router.get('/stories', communityController.getStories);
router.post('/stories/:id/like', communityController.likeStory);
router.get('/stories/:id', communityController.getStoryById);

module.exports = router;
