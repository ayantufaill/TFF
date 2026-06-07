const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

// @route   GET api/comments/:moduleId
// @desc    Get all comments for a module
// @access  Public
router.get('/:moduleId', async (req, res) => {
  try {
    const comments = await Comment.find({ moduleId: req.params.moduleId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/comments
// @desc    Create a comment or reply
// @access  Private
router.post('/', auth, async (req, res) => {
  const { moduleId, content, parentId } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const newComment = new Comment({
      moduleId,
      userId: req.user.id,
      content,
      parentId: parentId || null
    });

    const comment = await newComment.save();
    
    // Populate user info before sending back
    const populatedComment = await Comment.findById(comment._id).populate('userId', 'name avatar');
    
    res.json(populatedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check user
    if (comment.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    comment.content = content;
    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate('userId', 'name avatar');
    res.json(populatedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check user (or admin)
    if (comment.userId.toString() !== req.user.id) {
      // Check if user is admin
      // Note: req.user should have role if the auth middleware handles it
      // Let's assume for now only the author can delete
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    
    // Also delete all replies? 
    // Usually yes, to maintain data integrity
    await Comment.deleteMany({ parentId: req.params.id });

    res.json({ message: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
