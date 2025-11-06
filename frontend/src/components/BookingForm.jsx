import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const BookingForm = () => {
  const { user } = useAuth();
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

  // ✅ Custom room list
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

  // ✅ Room prices
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Calculate total dynamically
  const totalAmount =
    formData.room_type && roomPrices[formData.room_type]
      ? roomPrices[formData.room_type] * formData.guests
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.room_type) {
      Swal.fire("Select Room Type", "Please select a room before booking.", "warning");
      return;
    }

    const { value: paymentMode } = await Swal.fire({
      title: "Select Payment Method",
      input: "radio",
      inputOptions: {
        prepaid: "Pay Online (Prepaid)",
        visit: "Pay on Visit",
      },
      inputValidator: (value) => {
        if (!value) return "Please choose a payment mode!";
      },
      confirmButtonText: "Continue",
      confirmButtonColor: "#14532d",
      background: "linear-gradient(to right, #fef08a, #fde68a)",
      color: "#000000",
      customClass: {
        input: "text-black",
        title: "text-black text-2xl font-semibold",
        confirmButton: "bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-600",
      },
      didOpen: () => {
        const labels = Swal.getPopup().querySelectorAll("label");
        labels.forEach((label) => {
          label.style.color = "#000000";
          label.style.fontSize = "1rem";
          label.style.marginLeft = "5px";
          label.style.fontWeight = "500";
        });
      },
    });

    if (paymentMode === "prepaid") {
      const { value: card } = await Swal.fire({
        title: "Enter Card Details",
        html: `
          <input type="text" id="card" class="swal2-input" placeholder="Card Number (XXXX XXXX XXXX XX)">
          <input type="text" id="expiry" class="swal2-input" placeholder="MM/YY">
          <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
        `,
        focusConfirm: false,
        confirmButtonText: "Continue",
        confirmButtonColor: "#14532d",
        background: "linear-gradient(to right, #064e3b, #0d9488)",
        color: "#fff",
        preConfirm: () => {
          const card = document.getElementById("card").value;
          if (!card) Swal.showValidationMessage("Please enter card details!");
          return { card };
        },
      });

      if (card) {
        const { value: pin } = await Swal.fire({
          title: `Enter Payment PIN`,
          html: `<input type="password" maxlength="6" class="swal2-input" placeholder="••••••">`,
          confirmButtonText: `Pay ₹${totalAmount}`,
          confirmButtonColor: "#14532d",
          background: "linear-gradient(to right, #064e3b, #0d9488)",
          color: "#fff",
          preConfirm: () => true,
        });

        if (pin) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `
              <p><b>Booking Summary</b></p>
              <p>Name: ${formData.name}</p>
              <p>Email: ${formData.email}</p>
              <p>Room Type: ${formData.room_type}</p>
              <p>Guests: ${formData.guests}</p>
              <p>Total Paid: ₹${totalAmount}</p>
              <p>Check-In: ${formData.check_in}</p>
              <p>Check-Out: ${formData.check_out}</p>
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
        }
      }
    } else if (paymentMode === "visit") {
      await Swal.fire({
        icon: "info",
        title: "Booking Confirmed!",
        html: `
          <p><b>Pay on Visit</b></p>
          <p>Name: ${formData.name}</p>
          <p>Room Type: ${formData.room_type}</p>
          <p>Guests: ${formData.guests}</p>
          <p>Total Due: ₹${totalAmount}</p>
          <p>Check-In: ${formData.check_in}</p>
          <p>Check-Out: ${formData.check_out}</p>
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
          <input id="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-3 rounded text-black border-2 border-yellow-400" required />
          <input id="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="p-3 rounded text-black border-2 border-yellow-400" required />
          <input id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="p-3 rounded text-black border-2 border-yellow-400" />

          {/* ✅ Room dropdown with custom room titles */}
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

          <input id="check_in" type="date" value={formData.check_in} onChange={handleChange} className="p-3 rounded text-black border-2 border-yellow-400" required />
          <input id="check_out" type="date" value={formData.check_out} onChange={handleChange} className="p-3 rounded text-black border-2 border-yellow-400" required />
          <input id="guests" type="number" value={formData.guests} onChange={handleChange} className="p-3 rounded text-black border-2 border-yellow-400" min="1" />
          <textarea id="special_requests" value={formData.special_requests} onChange={handleChange} placeholder="Special Requests" className="p-3 rounded text-black border-2 border-yellow-400 col-span-2" />

          {/* ✅ Total Price Display */}
          {totalAmount > 0 && (
            <div className="col-span-2 text-center text-lg font-semibold text-yellow-300">
              💰 Estimated Total: ₹{totalAmount}
            </div>
          )}

          <button type="submit" className="bg-yellow-600 text-white py-3 rounded-full font-semibold hover:bg-green-900 col-span-2 transition-all duration-300">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
