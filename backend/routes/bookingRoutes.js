const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { protect } = require("../middleware/authMiddleware");

// Only logged-in users can book
router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      roomType,        // frontend sends this
      checkIn,         // frontend sends this
      checkOut,        // frontend sends this
      guests,
      specialRequests, // frontend sends this
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !roomType || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ msg: "All booking fields are required" });
    }

    // Convert dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      return res.status(400).json({ msg: "Invalid date format" });
    }

    // Create booking (keep correct DB field names)
    const booking = new Booking({
      name,
      email,
      phone,
      room_type: roomType,              // DB field
      check_in: checkInDate,            // DB field
      check_out: checkOutDate,          // DB field
      guests,
      special_requests: specialRequests || "",
      user: req.user._id,
    });

    await booking.save();

    res.status(201).json({
      msg: "Booking Successful",
      booking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;
