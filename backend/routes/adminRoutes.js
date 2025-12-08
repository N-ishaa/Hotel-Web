const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/authMiddleware'); // ✅ JWT middleware

// Get all bookings (admin only)
router.get('/bookings', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// Get all users (admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// Get all contact messages (admin only)
router.get('/contacts', protect, admin, async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

module.exports = router;
