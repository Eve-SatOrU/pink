const Story  = require('../models/Story');
const Like = require('../models/like');
const User = require('../models/user');
exports.createStory = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.userId;
    const sessionUser = req.session.user;
  
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    if (!sessionUser) {
      return res.status(401).json({ error: 'You need to be logged in to create story' });
    }  
    if (!userId) {
      return res.status(401).json({ error: 'You need to be logged in to post a story' });
    }
    try {
      const story = await Story.create({
        title,
        content,
        author_id: userId
      });
      res.status(201).json({ message: 'Story posted successfully', story });
    } catch (error) {
      res.status(500).json({ error: 'Failed to post story' });
    }
  };

  exports.getStories = async (req, res) => {
    const { sort } = req.query; // options: "newest", "most_liked" ...
    // Default newest first
    let order = [['createdAt', 'DESC']];
    if (sort === 'most_liked') {
      order = [['likes_count', 'DESC']];
    }
  
    try {
      const stories = await Story.findAll({
        include: [{
          model: User,
          attributes: ['userName']
        }],
        order
      });
  
      if (stories.length === 0) {
        return res.status(404).json({ message: 'No stories found' });
      }
  
      res.status(200).json({ stories });
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Failed to fetch stories', details: error.message });
    }
  };
  
  exports.likeStory = async (req, res) => {
    const storyId = req.params.id;
    const userId = req.session.userId; 
    const sessionUser = req.session.user;
    if(!sessionUser){
      return res.status(401).json({ error: 'You need to be logged in to like story' });
    }
    try {
      // Check if the user has already liked the story
      const existingLike = await Like.findOne({
        where: { user_id: userId, story_id: storyId }
      });
  
      if (existingLike) {
        return res.status(400).json({ error: 'You have already liked this story' });
      }
  
      // Add the like
      await Like.create({ user_id: userId, story_id: storyId });
  
      // Update the likes count on the story
      const story = await Story.findByPk(storyId);
      if (!story) {
        return res.status(404).json({ error: 'Story not found' });
      }
  
      story.likes_count += 1;
      await story.save();
  
      res.status(200).json({ message: 'Story liked successfully', likes_count: story.likes_count });
    } catch (error) {
      console.error('Error liking the story:', error); // Log the error to see what went wrong
      res.status(500).json({ error: 'Failed to like the story', details: error.message });
    }
  };
  

  

  exports.getStoryById = async (req, res) => {
    const storyId = req.params.id;
  
    try {
      const story = await Story.findByPk(storyId, {
        include: [{
          model: User,
          attributes: ['userName']
        }]
      });
  
      if (!story) {
        return res.status(404).json({ error: 'Story not found' });
      }
  
      res.status(200).json({ story });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the story' });
    }
  };

  