import React, { useState } from "react";
import Swal from "sweetalert2";
import QRImage from "../assets/webp/QR.webp";
import { useAuth } from "../context/AuthContext";

const MAX_GUESTS_PER_ROOM = 5;

const BookingForm = () => {
  const { user, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    room_type: "",
    check_in: "",
    check_out: "",
    guests: 1,
    special_requests: "",
  });

  // Rooms with title + price
  const rooms = [
    { title: "Single Suite", price: 1500 },
    { title: "Double Suite", price: 2500 },
    { title: "Deluxe Suite", price: 3500 },
    { title: "Family Suite", price: 4000 },
    { title: "Executive Suite", price: 5000 },
    { title: "Poolside Villa", price: 6000 },
    { title: "Luxury Penthouse", price: 8000 },
    { title: "Royal Suite", price: 10000 },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [id]: digitsOnly }));
    } else if (id === "guests") {
      let guestsValue = parseInt(value, 10);

      if (isNaN(guestsValue) || guestsValue < 1) {
        guestsValue = 1;
      }

      // Prevent more than 5 guests
      if (guestsValue > MAX_GUESTS_PER_ROOM) {
        Swal.fire(
          "Guest Limit Exceeded",
          "A maximum of 5 guests can stay in a single room.",
          "warning"
        );
        guestsValue = MAX_GUESTS_PER_ROOM;
      }

      setFormData((prev) => ({ ...prev, guests: guestsValue }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const guestsCount = Number(formData.guests) || 0;
  const roomsRequired = 1; // single room, max 5 guests

  const selectedRoom = rooms.find((room) => room.title === formData.room_type);
  const pricePerRoom = selectedRoom?.price || 0;
  const totalAmount = pricePerRoom * roomsRequired;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.phone)) {
      Swal.fire(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number.",
        "error"
      );
      return;
    }

    if (!formData.room_type) {
      Swal.fire("Select Room Type", "Please select a room.", "warning");
      return;
    }

    if (!isLoggedIn) {
      Swal.fire("Not Logged In", "Please login to book a room.", "error");
      return;
    }

    // Payment selection
    const { value: paymentMode } = await Swal.fire({
      title: "Select Payment Method",
      input: "radio",
      inputOptions: {
        qr: "Pay Online (QR)",
        visit: "Pay on Visit",
      },
      inputValidator: (value) => {
        if (!value) return "Please choose a payment mode!";
      },
      confirmButtonText: "Continue",
      confirmButtonColor: "#14532d",
      background: "linear-gradient(to right, #fef08a, #fde68a)",
      color: "#000",
    });

    if (!paymentMode) return;

    if (paymentMode === "qr") {
      await Swal.fire({
        title: "Scan QR to Pay",
        html: `
          <div style="text-align:center;">
            <img src="${QRImage}" alt="QR Code" style="width:200px; display:block; margin:0 auto;" />
            <p style="margin-top:10px;">Send payment to +91 9821630750</p>
            <p style="margin-top:10px;">Guests: ${guestsCount}</p>
            <p style="margin-top:5px;">Max 5 guests allowed per room</p>
            <p style="margin-top:5px;">Amount: ₹${totalAmount}</p>
          </div>
        `,
        confirmButtonText: "Paid",
        confirmButtonColor: "#14532d",
        background: "linear-gradient(to right, #064e3b, #0d9488)",
        color: "#fff",
      });
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `+91${formData.phone}`,
          roomType: formData.room_type,
          checkIn: formData.check_in,
          checkOut: formData.check_out,
          guests: guestsCount,
          rooms: roomsRequired,
          specialRequests: formData.special_requests,
          pricePerRoom,
          totalAmount,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Booking failed");

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        html: `
          <p>Name: ${formData.name}</p>
          <p>Email: ${formData.email}</p>
          <p>Room Type: ${formData.room_type}</p>
          <p>Guests: ${guestsCount}</p>
          <p>Rooms: ${roomsRequired}</p>
          <p>Price per Room: ₹${pricePerRoom}</p>
          <p>Total Amount: ₹${totalAmount}</p>
        `,
        confirmButtonColor: "#14532d",
        background: "linear-gradient(to right, #064e3b, #0d9488)",
        color: "#fff",
      });

      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        room_type: "",
        check_in: "",
        check_out: "",
        guests: 1,
        special_requests: "",
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-900 to-green-800 text-white pt-24 pb-16">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-yellow-400 shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-3 text-yellow-400">
          Book Your Stay
        </h2>
        <p className="text-center text-white mb-6">
          Fill all your details to reserve your perfect room at Hotel IP Residency.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-3 rounded text-black border-2 border-yellow-400"
            required
          />

          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="p-3 rounded text-black border-2 border-yellow-400"
            required
          />

          <div className="flex">
            <span className="p-3 rounded-l text-black border-2 border-yellow-400 bg-yellow-100 text-yellow-900">
              +91
            </span>
            <input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-3 rounded-r text-black border-2 border-yellow-400 flex-1"
              required
              maxLength={10}
            />
          </div>

          {/* Room Type with name + price */}
          <div className="flex flex-col md:col-span-1 col-span-2">
            <select
              id="room_type"
              value={formData.room_type}
              onChange={handleChange}
              className="p-3 rounded text-black border-2 border-yellow-400 bg-white text-sm md:text-base"
              required
            >
              <option value="">Select Room Type</option>
              {rooms.map((room, idx) => (
                <option key={idx} value={room.title}>
                  {room.title} — ₹{room.price.toLocaleString("en-IN")}/night
                </option>
              ))}
            </select>
            <span className="text-xs text-yellow-200 mt-1">
              Prices are per night, inclusive of basic amenities.
            </span>
          </div>

          {/* Check-in with label */}
          <div className="flex flex-col">
            <label className="text-sm text-yellow-200 mb-1">
              Select Check-In Date
            </label>
            <input
              id="check_in"
              type="date"
              value={formData.check_in}
              onChange={handleChange}
              className="p-3 rounded text-black border-2 border-yellow-400"
              required
            />
          </div>

          {/* Check-out with label */}
          <div className="flex flex-col">
            <label className="text-sm text-yellow-200 mb-1">
              Select Check-Out Date
            </label>
            <input
              id="check_out"
              type="date"
              value={formData.check_out}
              onChange={handleChange}
              className="p-3 rounded text-black border-2 border-yellow-400"
              required
            />
          </div>

          {/* Guests with helper text */}
          <div className="flex flex-col">
            <label className="text-sm text-yellow-200 mb-1">
              Number of Guests
            </label>

            <input
              id="guests"
              type="number"
              value={formData.guests}
              onChange={handleChange}
              className="p-3 rounded text-black border-2 border-yellow-400"
              min="1"
              max={MAX_GUESTS_PER_ROOM}
            />

            <span className="text-xs text-yellow-200 mt-1">
              A maximum of {MAX_GUESTS_PER_ROOM} guests can stay in a single room.
            </span>
          </div>

          <textarea
            id="special_requests"
            value={formData.special_requests}
            onChange={handleChange}
            placeholder="Special Requests"
            className="p-3 rounded text-black border-2 border-yellow-400 col-span-2"
          />

          <div className="col-span-2 text-center text-lg font-semibold text-yellow-300">
            💰 Estimated Total: ₹{totalAmount || 0}
          </div>

          <button
            type="submit"
            className="bg-yellow-600 text-white py-3 rounded-full font-semibold hover:bg-green-900 col-span-2 transition-all duration-300"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
