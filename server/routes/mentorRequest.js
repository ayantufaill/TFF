const express = require('express');
const router = express.Router();
const MentorRequest = require('../models/MentorRequest');
const sendEmail = require('../services/emailService');

// @route   POST api/mentor-request
// @desc    Submit a request to speak with a mentor
// @access  Public
router.post('/', async (req, res) => {
  const { name, contact, message } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    const request = await MentorRequest.create({ name, contact, message });

    if (contact.includes('@')) {
      sendEmail({
        email: contact,
        subject: 'We received your request — The Two Fingers Foundation',
        message: `Assalamu Alaikum ${name},\n\nThank you for reaching out. A mentor from our team will be in touch with you soon, insha'Allah. There is no rush and no pressure — we are simply glad you reached out.\n\n- The Two Fingers Foundation`,
        html: `<p>Assalamu Alaikum ${name},</p><p>Thank you for reaching out. A mentor from our team will be in touch with you soon, insha'Allah. There is no rush and no pressure — we are simply glad you reached out.</p><p>— The Two Fingers Foundation</p>`
      }).catch((err) => console.error('Mentor request confirmation email failed:', err.message));
    }

    res.status(201).json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
