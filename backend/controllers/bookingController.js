const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const {
      name, email, phone, room_type,
      check_in, check_out, guests,
      special_requests, totalAmount, paymentMode
    } = req.body;

    if (!room_type || !check_in || !check_out) {
      return res.status(400).json({ message: "room_type, check_in and check_out are required" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      name: name || req.user.name,
      email: email || req.user.email,
      phone,
      room_type,
      check_in,
      check_out,
      guests,
      special_requests,
      totalAmount: totalAmount || 0,
      paymentMode: paymentMode || "visit",
      paymentStatus: paymentMode === "prepaid" ? "paid" : "unpaid"
    });

    res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
