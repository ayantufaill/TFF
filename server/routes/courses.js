const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const MainCourse = require('../models/MainCourse');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Assessment = require('../models/Assessment');

// @route   GET api/courses
// @desc    Get all main courses with their hierarchy
// @access  Public
router.get('/', async (req, res) => {
  try {
    const mainCourses = await MainCourse.find().sort({ order: 1 });
    const fullHierarchy = await Promise.all(mainCourses.map(async (mainCourse) => {
      const levels = await Course.find({ mainCourseId: mainCourse._id }).sort({ level: 1 });
      const levelsWithModules = await Promise.all(levels.map(async (level) => {
        const modules = await Module.find({ courseId: level._id }).sort({ number: 1 });
        return { ...level.toObject(), modules };
      }));
      return { ...mainCourse.toObject(), levels: levelsWithModules };
    }));
    res.json(fullHierarchy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/courses/main/:id
// @desc    Get a specific main course with levels
// @access  Public
router.get('/main/:id', async (req, res) => {
  try {
    const mainCourse = await MainCourse.findById(req.params.id);
    if (!mainCourse) return res.status(404).json({ message: 'Course not found' });
    
    const levels = await Course.find({ mainCourseId: mainCourse._id }).sort({ level: 1 });
    const levelsWithModules = await Promise.all(levels.map(async (level) => {
      const modules = await Module.find({ courseId: level._id }).sort({ number: 1 });
      return { ...level.toObject(), modules };
    }));
    
    res.json({ ...mainCourse.toObject(), levels: levelsWithModules });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/courses/assessment/:levelId
// @desc    Get assessment for a specific level ID
// @access  Private
router.get('/assessment/:levelId', auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ courseId: req.params.levelId });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ADMIN ROUTES

// @route   POST api/courses/admin/main
// @desc    Create or update a main course
// @access  Private/Admin
router.post('/admin/main', [auth, admin], async (req, res) => {
  const { id, title, description, image, category, order } = req.body;
  try {
    let mainCourse;
    if (id) {
      mainCourse = await MainCourse.findByIdAndUpdate(id, { title, description, image, category, order }, { new: true });
    } else {
      mainCourse = new MainCourse({ title, description, image, category, order });
      await mainCourse.save();
    }
    res.json(mainCourse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses/admin/levels
// @desc    Create or update a level
// @access  Private/Admin
router.post('/admin/levels', [auth, admin], async (req, res) => {
  const { id, mainCourseId, level, title, subtitle, description, color, order } = req.body;
  try {
    let levelObj;
    if (id) {
      levelObj = await Course.findByIdAndUpdate(id, { mainCourseId, level, title, subtitle, description, color, order }, { new: true });
    } else {
      levelObj = new Course({ mainCourseId, level, title, subtitle, description, color, order });
      await levelObj.save();
    }
    res.json(levelObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses/admin/modules
// @desc    Create or update a module
// @access  Private/Admin
router.post('/admin/modules', [auth, admin], async (req, res) => {
  const { id, courseId, number, title, description, videoId, topics, formats, order } = req.body;
  try {
    let moduleObj;
    if (id) {
      moduleObj = await Module.findByIdAndUpdate(id, { courseId, number, title, description, videoId, topics, formats, order }, { new: true });
    } else {
      moduleObj = new Module({ courseId, number, title, description, videoId, topics, formats, order });
      await moduleObj.save();
    }
    res.json(moduleObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/courses/admin/assessments
// @desc    Create or update an assessment
// @access  Private/Admin
router.post('/admin/assessments', [auth, admin], async (req, res) => {
  const { id, courseId, level, title, description, passingScore, questions } = req.body;
  try {
    let assessment;
    if (id) {
      assessment = await Assessment.findByIdAndUpdate(id, { courseId, level, title, description, passingScore, questions }, { new: true });
    } else {
      assessment = new Assessment({ courseId, level, title, description, passingScore, questions });
      await assessment.save();
    }
    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/courses/admin/main/:id
// @desc    Delete a main course
// @access  Private/Admin
router.delete('/admin/main/:id', [auth, admin], async (req, res) => {
  try {
    await MainCourse.findByIdAndDelete(req.params.id);
    res.json({ message: 'Main course removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/courses/admin/levels/:id
// @desc    Delete a level
// @access  Private/Admin
router.delete('/admin/levels/:id', [auth, admin], async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Level removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/courses/admin/modules/:id
// @desc    Delete a module
// @access  Private/Admin
router.delete('/admin/modules/:id', [auth, admin], async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: 'Module removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
