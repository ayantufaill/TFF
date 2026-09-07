const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const sendEmail = require('../services/emailService');

// @route   POST api/volunteer
// @desc    Submit a volunteer application
// @access  Public
router.post('/', async (req, res) => {
  const { fullName, phone, email, city, interest, availability, skills, message } = req.body;

  if (!fullName || !phone || !email || !city || !interest || !availability) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    const volunteer = await Volunteer.create({
      fullName,
      phone,
      email,
      city,
      interest,
      availability,
      skills,
      message
    });

    sendEmail({
      email,
      subject: 'Thank you for volunteering with The Two Fingers Foundation',
      message: `Assalamu Alaikum ${fullName},\n\nJazakAllah Khair for offering to volunteer with us as a ${interest}. We have received your details and someone from our team will reach out to you soon.\n\n- The Two Fingers Foundation`,
      html: `<p>Assalamu Alaikum ${fullName},</p><p>JazakAllah Khair for offering to volunteer with us as a <strong>${interest}</strong>. We have received your details and someone from our team will reach out to you soon.</p><p>— The Two Fingers Foundation</p>`
    }).catch((err) => console.error('Volunteer confirmation email failed:', err.message));

    res.status(201).json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
