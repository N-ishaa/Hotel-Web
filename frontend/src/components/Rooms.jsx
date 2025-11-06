// src/pages/Rooms.jsx
import React, { useEffect, useRef } from "react";
import deluxeImg from "../assets/optimized/deluxe.webp";
import suiteImg from "../assets/optimized/suite.webp";
import familyImg from "../assets/optimized/family.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  {
    name: "Deluxe Room",
    img: deluxeImg,
    desc: "Spacious room with king-size bed, city view, and all modern amenities.",
  },
  {
    name: "Suite Room",
    img: suiteImg,
    desc: "Luxury suite with living area, premium interiors, and complimentary breakfast.",
  },
  {
    name: "Family Room",
    img: familyImg,
    desc: "Perfect for families, with multiple beds and extra space for comfort.",
  },
];

const Rooms = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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
      id="rooms"
      ref={sectionRef}
      className="py-16 bg-white text-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-green-900 mb-6">Our Rooms</h2>
        <div className="w-24 h-1 bg-yellow-600 mx-auto mb-12"></div>

        {/* Room Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={room.img}
                alt={room.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-600 text-sm">{room.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ See All Rooms Button */}
        <button
          onClick={() => navigate("/stays")}
          className="mt-12 bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-yellow-700 transition duration-300"
        >
          See All Rooms
        </button>
      </div>
    </section>
  );
};

export default Rooms;
