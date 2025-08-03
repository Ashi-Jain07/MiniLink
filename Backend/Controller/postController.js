import postModel from '../Model/postModel.js';

// Get all posts (public feed)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    if (content.length > 500) {
      return res.status(400).json({ message: 'Post content too long (max 500 characters)' });
    }

    const post = new postModel({
      content: content.trim(),
      author: req.user._id
    });

    await post.save();
    await post.populate('author', 'name email');

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's posts
export const getPostById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const posts = await postModel.find({ author: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};