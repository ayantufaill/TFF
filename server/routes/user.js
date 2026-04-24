const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Namespace ? express.Router() : express.Router();

const getSuggestedModuleId = (user) => {
  // Ensure we have a plain object to work with
  const userObj = typeof user.toObject === 'function' ? user.toObject() : user;
  const lastViewed = userObj.lastViewedModuleId;

  // 1. Priority: Always return to the last viewed module if it exists
  if (lastViewed && lastViewed !== 'module-0') {
    return String(lastViewed);
  }
  
  // 2. Fallback: First uncompleted module
  const completedModules = Array.isArray(userObj.completedModules) ? userObj.completedModules : [];
  // Support both "module-1" and "1" formats just in case
  const completedSet = new Set();
  completedModules.forEach(id => {
    const sId = String(id);
    completedSet.add(sId);
    if (sId.startsWith('module-')) {
      completedSet.add(sId.replace('module-', ''));
    } else {
      completedSet.add(`module-${sId}`);
    }
  });
  
  for (let i = 1; i <= 15; i++) {
    const moduleId = `module-${i}`;
    if (!completedSet.has(moduleId) && !completedSet.has(String(i))) {
      return moduleId;
    }
  }
  
  return 'module-1';
};

// @route   POST api/user/progress
// @desc    Update user progress (add completed module)
// @access  Private
router.post('/progress', auth, async (req, res) => {
    const { moduleId, quizAnswers, lastViewedModuleId } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update progress - ensure no duplicates
      if (moduleId && !user.completedModules.includes(moduleId)) {
        user.completedModules.push(moduleId);
        user.markModified('completedModules'); // Explicitly mark for Mongoose save
      }

      // Update last viewed module
      if (lastViewedModuleId) {
        user.lastViewedModuleId = lastViewedModuleId;
      }
  
      // Update quiz answers if provided
      if (quizAnswers && typeof quizAnswers === 'object') {
        Object.keys(quizAnswers).forEach(quizId => {
          user.quizAnswers.set(quizId, quizAnswers[quizId]);
        });
      }

    // Streak Logic - Simplified and safer
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let lastActivity = null;
    if (user.lastActivityDate && typeof user.lastActivityDate.getFullYear === 'function') {
      lastActivity = new Date(user.lastActivityDate.getFullYear(), user.lastActivityDate.getMonth(), user.lastActivityDate.getDate());
    }

    if (!lastActivity) {
      user.currentStreak = 1;
    } else {
      const diffTime = today.getTime() - lastActivity.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.currentStreak += 1;
      } else if (diffDays > 1) {
        user.currentStreak = 1;
      }
    }

    user.lastActivityDate = now;
    if (user.currentStreak > (user.longestStreak || 0)) {
      user.longestStreak = user.currentStreak;
    }

    console.log(`Saving progress for ${user.email}...`);
    await user.save();
    console.log(`Progress saved successfully for ${user.email}.`);
    
    // Convert to object and add suggestedModuleId
    const userObj = user.toObject();
    userObj.suggestedModuleId = getSuggestedModuleId(user);
    
    res.json(userObj); // Return the full user object to update frontend context
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
    const userObj = user.toObject();
    userObj.suggestedModuleId = getSuggestedModuleId(user);
    res.json(userObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/user/profile
// @desc    Update user name and/or password
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name if provided
    if (name && name.trim().length >= 2) {
      user.name = name.trim();
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      if (newPassword.length < 5) {
        return res.status(400).json({ message: 'New password must be at least 5 characters' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    userObj.suggestedModuleId = getSuggestedModuleId(user);
    res.json(userObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
