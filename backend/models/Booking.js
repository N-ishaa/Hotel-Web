const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    room_type: {
      type: String,
      required: true,
    },

    check_in: {
      type: Date,
      required: true,
    },

    check_out: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    special_requests: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
