const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Namespace ? express.Router() : express.Router();

// @route   POST api/user/progress
// @desc    Update user progress (add completed module)
// @access  Private
router.post('/progress', auth, async (req, res) => {
  const { moduleId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.completedModules.includes(moduleId)) {
      user.completedModules.push(moduleId);
      await user.save();
    }

    res.json(user.completedModules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/user/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
