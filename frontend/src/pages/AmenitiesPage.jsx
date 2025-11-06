import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AmenitiesImg from "../assets/webp/amenities.webp";
import Amenities1 from "../assets/webp/amenities1.webp";
import Amenities2 from "../assets/webp/amenities2.webp";
import Amenities3 from "../assets/webp/amenities3.webp";
import Amenities4 from "../assets/webp/amenities4.webp";
import Amenities5 from "../assets/webp/amenities5.webp";
import Amenities6 from "../assets/webp/amenities6.webp";

gsap.registerPlugin(ScrollTrigger);

const AmenitiesPage = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🟣 Hero fade-in with a soft upward motion
      gsap.from(".hero-text", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.4,
        ease: "power4.out",
      });

      // 🟢 Cards animation: elegant lift + glow
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 🔵 Gallery images: parallax-like float effect
      imgRefs.current.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBackClick = () => {
    navigate("/#amenities");
    setTimeout(() => {
      const section = document.getElementById("amenities");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-100 mt-20 pb-16">
      {/* 🏞️ Hero Section */}
      <div className="relative overflow-hidden">
        <img
          src={AmenitiesImg}
          alt="Hotel Amenities"
          className="w-full h-[400px] object-cover brightness-90"
          loading="lazy"
        />
        <h1
          className="hero-text absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-wide drop-shadow-lg"
          style={{ color: "#DE7A0F" }}
        >
          Our Amenities
        </h1>
      </div>

      {/* 📝 Content Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mt-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Enjoy a stay filled with comfort, style, and convenience. From leisure
          to luxury, every amenity is designed to make your experience truly
          exceptional.
        </p>

        {/* Amenities List */}
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-800 font-medium">
          {[
            "🏊‍♂️ Swimming Pool",
            "🍽️ Restaurant & Bar",
            "💪 Modern Gym",
            "🚗 Free Parking",
            "📶 High-Speed Wi-Fi",
            "🛏️ Room Service",
          ].map((item, index) => (
            <li
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white shadow-md p-5 rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* 🖼️ Mini Gallery Section */}
        <div className="mini-gallery grid md:grid-cols-3 gap-6 mt-14">
          {[Amenities1, Amenities2, Amenities3, Amenities4, Amenities5, Amenities6].map(
            (img, index) => (
              <img
                key={index}
                ref={(el) => (imgRefs.current[index] = el)}
                src={img}
                alt={`Amenity ${index + 1}`}
                className="rounded-2xl shadow-lg object-cover h-64 w-full transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                loading="lazy"
              />
            )
          )}
        </div>

        {/* 🔙 Back Button */}
        <button
          onClick={handleBackClick}
          className="mt-14 bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-3 rounded-full font-semibold tracking-wide shadow-md hover:shadow-xl transition-all duration-300"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default AmenitiesPage;
