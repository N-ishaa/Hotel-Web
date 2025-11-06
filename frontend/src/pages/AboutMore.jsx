// src/pages/AboutMore.jsx
import React, { useEffect, useRef } from "react";
import { Star, Heart, Utensils, Wifi, Coffee, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 👇 Local images
import heroImage from "../assets/webp/HeroPage.webp";
import storyImage from "../assets/webp/AboutMore.webp";

gsap.registerPlugin(ScrollTrigger);

const AboutMore = () => {
  const sectionsRef = useRef([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Scroll to top when AboutMore mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Handle Book Now
  const handleBookNow = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/booking");
    }
  };

  return (
    <div className="bg-white">
      {/* 🌅 Hero Section */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-6">
          {/* ✅ FIXED: Force yellow color */}
          <h1
            className="text-5xl font-bold mb-4 drop-shadow-[0_0_20px_rgba(250,204,21,0.9)]"
            style={{ color: "#facc15" }} // Tailwind yellow-400 hex
          >
            Discover Hotel IP Residency
          </h1>

          <p className="text-lg max-w-2xl mx-auto text-white">
            Experience luxury, comfort, and impeccable service — where every stay feels like home.
          </p>
        </div>
      </section>

      {/* 🏨 Our Story */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="py-20 px-6 max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-green-900 mb-6">Our Story</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
          Founded with a vision to redefine hospitality,{" "}
          <span className="text-yellow-700 font-semibold">Hotel IP Residency</span>{" "}
          has become a preferred destination for travelers seeking a blend of luxury and warmth.
          From our humble beginnings, we’ve grown into a full-service hotel known for elegance,
          exceptional dining, and heartfelt service.
        </p>

        <img
          src={storyImage}
          alt="Hotel view"
          className="rounded-2xl shadow-xl mx-auto w-full max-w-3xl"
        />
      </section>

      {/* 💎 Why Choose Us */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="py-20 bg-green-50"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-10">Why Choose Us</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Star, title: "Luxury & Comfort", text: "Elegant interiors, plush bedding, and refined décor create an atmosphere of pure relaxation." },
              { icon: Utensils, title: "Fine Dining", text: "Relish exquisite flavors crafted by our master chefs using the freshest ingredients." },
              { icon: Wifi, title: "Modern Amenities", text: "Stay connected and comfortable with high-speed WiFi, smart TVs, and 24/7 service." },
              { icon: Coffee, title: "Café & Lounge", text: "Unwind at our in-house café serving aromatic coffee and fresh bakes." },
              { icon: Heart, title: "Personalized Care", text: "Every guest is special — our team ensures your stay exceeds expectations." },
              { icon: Users, title: "Events & Gatherings", text: "From weddings to corporate events, our spaces are perfect for every occasion." },
            ].map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <Icon className="mx-auto text-yellow-600 mb-4" size={40} />
                <h3 className="font-semibold text-xl text-green-900 mb-2">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ Call to Action */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="py-20 bg-yellow-600 text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-4">Ready to Experience Luxury?</h2>
        <p className="text-lg mb-8">
          Book your stay with us today and discover why we’re the city’s most beloved destination.
        </p>
        <button
          onClick={handleBookNow}
          className="bg-white text-yellow-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-100 transition duration-300"
        >
          Book Now
        </button>
      </section>
    </div>
  );
};

export default AboutMore;
