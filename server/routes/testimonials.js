const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');
const MainCourse = require('../models/MainCourse');
const Course = require('../models/Course');
const Module = require('../models/Module');
const Testimonial = require('../models/Testimonial');
const {
  uploadTestimonialMedia,
  fileToPublicUrl,
  cleanupUploadedFiles,
  deleteStoredMediaByUrl,
  validateUploadedFileSizes
} = require('../utils/testimonialStorage');

const router = express.Router();

const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const normalizeCompletedModules = (completedModules = []) => {
  const set = new Set();

  completedModules.forEach((id) => {
    const value = String(id);
    set.add(value);
    if (value.startsWith('module-')) {
      set.add(value.replace('module-', ''));
    }
  });

  return set;
};

const getCourseCompletion = async (user, mainCourseId) => {
  const mainCourse = await MainCourse.findById(mainCourseId);
  if (!mainCourse) {
    return { completed: false, reason: 'Course not found' };
  }

  const levels = await Course.find({ mainCourseId }).select('_id title level');
  const levelIds = levels.map((level) => level._id);
  const modules = await Module.find({ courseId: { $in: levelIds } }).select('_id number title courseId');

  if (modules.length === 0) {
    return { completed: false, reason: 'Course has no modules yet' };
  }

  const completedSet = normalizeCompletedModules(user.completedModules);
  const missingModule = modules.find((module) => {
    const moduleId = String(module._id);
    return !completedSet.has(`module-${moduleId}`) || !completedSet.has(`quiz-module-${moduleId}`);
  });

  return {
    completed: !missingModule,
    reason: missingModule ? 'Complete every lesson and quiz before submitting a testimonial' : null,
    mainCourse
  };
};

const uploadMedia = (req, res, next) => {
  uploadTestimonialMedia(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Uploaded files are too large'
        : err.message || 'Could not upload media';

    return res.status(400).json({ message });
  });
};

const serializeTestimonial = (testimonial) => {
  const obj = testimonial.toObject ? testimonial.toObject() : testimonial;
  const user = obj.userId || {};
  const mainCourse = obj.mainCourseId || {};

  return {
    ...obj,
    user: user && user._id ? { _id: user._id, name: user.name, email: user.email } : undefined,
    course: mainCourse && mainCourse._id ? { _id: mainCourse._id, title: mainCourse.title } : undefined
  };
};

// @route   POST api/testimonials
// @desc    Submit a testimonial for a completed course
// @access  Private
router.post('/testimonials', auth, uploadMedia, async (req, res) => {
  const { mainCourseId, text } = req.body;
  const rating = req.body.rating === '' || req.body.rating === undefined ? null : Number(req.body.rating);

  try {
    const sizeError = validateUploadedFileSizes(req.files);
    if (sizeError) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({ message: sizeError });
    }

    if (!isObjectId(mainCourseId)) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({ message: 'Valid course id is required' });
    }

    if (!text || String(text).trim().length < 20 || String(text).trim().length > 3000) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({ message: 'Testimonial must be between 20 and 3000 characters' });
    }

    if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
      cleanupUploadedFiles(req.files);
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      cleanupUploadedFiles(req.files);
      return res.status(404).json({ message: 'User not found' });
    }

    const completion = await getCourseCompletion(user, mainCourseId);
    if (!completion.completed) {
      cleanupUploadedFiles(req.files);
      return res.status(403).json({ message: completion.reason });
    }

    const existing = await Testimonial.findOne({ userId: req.user.id, mainCourseId });
    if (existing) {
      cleanupUploadedFiles(req.files);
      return res.status(409).json({ message: 'You have already submitted a testimonial for this course' });
    }

    const testimonial = await Testimonial.create({
      userId: req.user.id,
      mainCourseId,
      text: String(text).trim(),
      rating,
      profileImageUrl: fileToPublicUrl(req.files?.profileImage?.[0]),
      videoUrl: fileToPublicUrl(req.files?.video?.[0]),
      status: 'APPROVED',
      reviewedAt: new Date()
    });

    const populated = await Testimonial.findById(testimonial._id)
      .populate('userId', 'name email')
      .populate('mainCourseId', 'title');

    return res.status(201).json(serializeTestimonial(populated));
  } catch (err) {
    cleanupUploadedFiles(req.files);

    if (err.code === 11000) {
      return res.status(409).json({ message: 'You have already submitted a testimonial for this course' });
    }

    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/testimonials/my
// @desc    Get the current user's testimonials
// @access  Private
router.get('/testimonials/my', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ userId: req.user.id })
      .populate('mainCourseId', 'title')
      .sort({ createdAt: -1 });

    res.json(testimonials.map(serializeTestimonial));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/testimonials/public
// @desc    Get approved public testimonials
// @access  Public
router.get('/testimonials/public', async (_req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'APPROVED' })
      .populate('userId', 'name')
      .populate('mainCourseId', 'title')
      .sort({ updatedAt: -1 })
      .limit(50);

    res.json(testimonials.map(serializeTestimonial));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/admin/testimonials
// @desc    Get all testimonials for moderation
// @access  Private/Admin
router.get('/admin/testimonials', [auth, admin], async (req, res) => {
  try {
    const status = req.query.status;
    const filter = status && ['PENDING', 'APPROVED', 'REJECTED', 'HIDDEN'].includes(status)
      ? { status }
      : {};

    const testimonials = await Testimonial.find(filter)
      .populate('userId', 'name email')
      .populate('mainCourseId', 'title')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(testimonials.map(serializeTestimonial));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH api/admin/testimonials/:id/status
// @desc    Update testimonial moderation status
// @access  Private/Admin
router.patch('/admin/testimonials/:id/status', [auth, admin], async (req, res) => {
  const { status, adminNotes = '' } = req.body;

  if (!['PENDING', 'APPROVED', 'REJECTED', 'HIDDEN'].includes(status)) {
    return res.status(400).json({ message: 'Invalid testimonial status' });
  }

  if (String(adminNotes).length > 1000) {
    return res.status(400).json({ message: 'Admin notes must be 1000 characters or fewer' });
  }

  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNotes: String(adminNotes).trim(),
        reviewedBy: req.user.id,
        reviewedAt: new Date()
      },
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('mainCourseId', 'title')
      .populate('reviewedBy', 'name email');

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json(serializeTestimonial(testimonial));
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/admin/testimonials/:id
// @desc    Delete a testimonial
// @access  Private/Admin
router.delete('/admin/testimonials/:id', [auth, admin], async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    deleteStoredMediaByUrl(testimonial.profileImageUrl);
    deleteStoredMediaByUrl(testimonial.videoUrl);

    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
