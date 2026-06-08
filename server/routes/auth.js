const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const admin = require('../config/firebase');
const router = express.Namespace ? express.Router() : express.Router();

if (!process.env.JWT_SECRET) {
  console.error('❌ FATAL ERROR: JWT_SECRET is not defined in .env file.');
  process.exit(1);
}

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    console.log('✅ User saved successfully, generating token...');

    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('❌ JWT Sign Error:', err);
          throw err;
        }
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, completedModules: user.completedModules } });
      }
    );
  } catch (err) {
    console.error('❌ Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('❌ JWT Sign Error:', err);
          throw err;
        }
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, completedModules: user.completedModules } });
      }
    );
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

const sendEmail = require('../services/emailService');

// @route   POST api/auth/forgot-password
// @desc    Forgot password - send OTP
// @access  Public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user found with that email' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP and expiry (15 minutes)
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your Password Reset Code - TFF',
        message: `Your password reset code is: ${otp}. It expires in 15 minutes.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2C5F2D;">Password Reset Request</h2>
            <p>You requested a password reset for your Two Finger Foundation account.</p>
            <p>Your 6-digit verification code is:</p>
            <h1 style="color: #C9A961; letter-spacing: 5px;">${otp}</h1>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
        `
      });

      res.json({ message: 'Code sent to email' });
    } catch (err) {
      user.resetOTP = undefined;
      user.resetOTPExpires = undefined;
      await user.save();
      console.error('Email error:', err);
      return res.status(500).json({ message: 'Error sending email. Please try again later.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/reset-password
// @desc    Reset password using OTP
// @access  Public
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ 
      email,
      resetOTP: otp,
      resetOTPExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    // Check if new password is same as old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as your current password. Please choose a different one.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // Clear reset fields
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now login.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/google-login
// @desc    Login or Register user via Google Firebase ID Token
// @access  Public
router.post('/google-login', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: 'Firebase ID Token is required' });
  }

  try {
    // 1) Verify the Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name } = decodedToken;

    if (!email) {
      return res.status(400).json({ message: 'Email not provided in Google account' });
    }

    // 2) Find or create user in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Create a password-less user (or generate a random password)
      const randomPassword = Math.random().toString(36).slice(-10) + '!A1';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = new User({
        name: name || email.split('@')[0],
        email,
        password: hashedPassword, // placeholder password
        role: 'user'
      });
      await user.save();
      console.log(`✅ New user registered via Google: ${email}`);
    } else {
      console.log(`✅ User logged in via Google: ${email}`);
    }

    // 3) Generate custom application JWT
    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('❌ JWT Sign Error:', err);
          return res.status(500).json({ message: 'Error signing token' });
        }
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            completedModules: user.completedModules
          }
        });
      }
    );
  } catch (err) {
    console.error('❌ Firebase ID Token Verification Failed:', err);
    res.status(401).json({ message: 'Invalid Google Token', error: err.message });
  }
});

module.exports = router;
