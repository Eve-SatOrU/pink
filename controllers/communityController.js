const Story  = require('../models/Story');
const Like = require('../models/like');
exports.createStory = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.userId;
  
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
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
    const { sort } = req.query; // options is ><: "newest", "most_liked" ...
  
    let order = [['created_at', 'DESC']]; // the default is newest bbebebebebe
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
      res.status(200).json({ stories });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stories' });
    }
  };

exports.likeStory = async (req, res) => {
    const storyId = req.params.id;
    const userId = req.session.userId; 
  
    try {
      // if user has already liked the story
      const existingLike = await Like.findOne({
        where: { user_id: userId, story_id: storyId }
      });
  
      if (existingLike) {
        return res.status(400).json({ error: 'You have already liked this story' });
      }
  
      await Like.create({ user_id: userId, story_id: storyId });
      const story = await Story.findByPk(storyId);
      story.likes_count += 1;
      await story.save();
  
      res.status(200).json({ message: 'Story liked successfully', likes_count: story.likes_count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to like the story' });
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

  