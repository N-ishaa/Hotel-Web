const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ➤ Create a new contact message (PUBLIC)
router.post('/', async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    await contact.save();
    res.status(201).json({ msg: "Message sent successfully", contact });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

// ➤ Get all messages (admin use)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
});

module.exports = router;
