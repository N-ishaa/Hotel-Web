import React, { useEffect, useState, useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

const Contact = () => {
  const { user, token, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const sectionRef = useRef(null);

  // ✅ Pre-fill name & email only when user is logged in and page is not refreshed
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      await Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to send a message.",
        confirmButtonColor: "#14532d",
      });
      return; // stop execution
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Failed to send message");

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out! We'll get back to you soon.",
        confirmButtonColor: "#14532d",
        background: "linear-gradient(to right, #fef08a, #fde68a)",
      });

      // ✅ Reset the entire form after submit
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // ✅ GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".contact-animate");

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "restart none restart none",
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-white text-gray-800 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="contact-animate">
          <h2 className="text-4xl font-bold text-center text-green-900 mb-4 tracking-wide">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mb-10"></div>

          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Have a question, feedback, or booking inquiry?  
            We’d love to hear from you! Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 contact-animate">
            <div className="flex items-start space-x-4 bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition">
              <FaMapMarkerAlt className="text-yellow-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-green-900">Address</h3>
                <p className="text-gray-700">123 Residency Road, Delhi, India</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition">
              <FaPhoneAlt className="text-yellow-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-green-900">Phone</h3>
                <p className="text-gray-700">+91 7011082937</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition">
              <FaEnvelope className="text-yellow-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-green-900">Email</h3>
                <p className="text-gray-700">info@ipresidency.com</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-animate bg-white rounded-2xl shadow-xl p-8 space-y-5 border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-center text-green-900 mb-4">
              Send Us a Message
            </h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none transition"
            ></textarea>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Send Message ✉️
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
