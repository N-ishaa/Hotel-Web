import React, { useState } from "react";
import Swal from "sweetalert2";
import QRImage from "../assets/webp/QR.webp";
import { useAuth } from "../context/AuthContext";

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

  const rooms = [
    { title: "Single Suite" },
    { title: "Double Suite" },
    { title: "Deluxe Suite" },
    { title: "Family Suite" },
    { title: "Executive Suite" },
    { title: "Poolside Villa" },
    { title: "Luxury Penthouse" },
    { title: "Royal Suite" },
  ];

  const roomPrices = {
    "Single Suite": 1500,
    "Double Suite": 2500,
    "Deluxe Suite": 3500,
    "Family Suite": 4000,
    "Executive Suite": 5000,
    "Poolside Villa": 6000,
    "Luxury Penthouse": 8000,
    "Royal Suite": 10000,
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Only allow digits in phone input
    if (id === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, [id]: digitsOnly });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const totalAmount =
    formData.room_type && roomPrices[formData.room_type]
      ? roomPrices[formData.room_type] * formData.guests
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone validation: exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      Swal.fire(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number.",
        "error"
      );
      return;
    }

    if (!formData.room_type) {
      Swal.fire(
        "Select Room Type",
        "Please select a room before booking.",
        "warning"
      );
      return;
    }

    if (!isLoggedIn) {
      Swal.fire(
        "Not Logged In",
        "Please login or signup before making a booking.",
        "error"
      );
      return;
    }

    // 🔥 Dummy QR Payment Flow
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
        <p class="mt-2" style="margin-top:10px;">Send payment to +91 7011082937</p>
      </div>
    `,
    confirmButtonText: `Paid ₹${totalAmount}`,
    confirmButtonColor: "#14532d",
    background: "linear-gradient(to right, #064e3b, #0d9488)",
    color: "#fff",
  });
}

    try {
      // Send booking to backend
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
          phone: `+91${formData.phone}`, // Add +91 here
          roomType: formData.room_type,
          checkIn: formData.check_in,
          checkOut: formData.check_out,
          guests: formData.guests,
          specialRequests: formData.special_requests,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Booking failed");

      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        html: `
          <p>Name: ${data.booking?.name}</p>
          <p>Email: ${data.booking?.email}</p>
          <p>Room Type: ${data.booking?.roomType}</p>
          <p>Guests: ${data.booking?.guests}</p>
          <p>Check-In: ${data.booking?.checkIn}</p>
          <p>Check-Out: ${data.booking?.checkOut}</p>
          <p>Total Amount: ₹${totalAmount}</p>
          <p>Payment Mode: ${paymentMode === "qr" ? "Online QR" : "Pay on Visit"}</p>
          <p>Phone: +91${formData.phone}</p>
        `,
        confirmButtonColor: "#14532d",
        background: "linear-gradient(to right, #064e3b, #0d9488)",
        color: "#fff",
      });

      // Reset form
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <span className="p-3 rounded-l text-black border-2 border-yellow-400 bg-yellow-100 text-yellow-900">+91</span>
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

          <select
            id="room_type"
            value={formData.room_type}
            onChange={handleChange}
            className="p-3 rounded text-black border-2 border-yellow-400"
            required
          >
            <option value="">Select Room Type</option>
            {rooms.map((room, idx) => (
              <option key={idx} value={room.title}>
                {room.title}
              </option>
            ))}
          </select>

          <input
            id="check_in"
            type="date"
            value={formData.check_in}
            onChange={handleChange}
            className="p-3 rounded text-black border-2 border-yellow-400"
            required
          />
          <input
            id="check_out"
            type="date"
            value={formData.check_out}
            onChange={handleChange}
            className="p-3 rounded text-black border-2 border-yellow-400"
            required
          />
          <input
            id="guests"
            type="number"
            value={formData.guests}
            onChange={handleChange}
            className="p-3 rounded text-black border-2 border-yellow-400"
            min="1"
          />
          <textarea
            id="special_requests"
            value={formData.special_requests}
            onChange={handleChange}
            placeholder="Special Requests"
            className="p-3 rounded text-black border-2 border-yellow-400 col-span-2"
          />

          {totalAmount > 0 && (
            <div className="col-span-2 text-center text-lg font-semibold text-yellow-300">
              💰 Estimated Total: ₹{totalAmount}
            </div>
          )}

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
