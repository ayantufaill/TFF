const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Namespace ? express.Router() : express.Router();

// @route   POST api/user/progress
// @desc    Update user progress (add completed module)
// @access  Private
router.post('/progress', auth, async (req, res) => {
    const { moduleId, quizAnswers } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update progress
      if (moduleId && !user.completedModules.includes(moduleId)) {
        user.completedModules.push(moduleId);
      }
  
      // Update quiz answers if provided
      if (quizAnswers && typeof quizAnswers === 'object') {
        Object.keys(quizAnswers).forEach(quizId => {
          user.quizAnswers.set(quizId, quizAnswers[quizId]);
        });
      }

    // Streak Logic
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let lastActivity = null;
    if (user.lastActivityDate) {
      lastActivity = new Date(user.lastActivityDate.getFullYear(), user.lastActivityDate.getMonth(), user.lastActivityDate.getDate());
    }

    if (!lastActivity) {
      // First activity ever
      user.currentStreak = 1;
    } else {
      const diffTime = today.getTime() - lastActivity.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        user.currentStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        user.currentStreak = 1;
      }
      // If diffDays === 0, it's the same day, no change to streak
    }

    user.lastActivityDate = now;
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    await user.save();
    res.json(user); // Return the full user object to update frontend context
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
