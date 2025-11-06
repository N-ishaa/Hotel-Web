import React, { useEffect, useRef } from "react";
import {
  FaWifi,
  FaSwimmingPool,
  FaUtensils,
  FaDumbbell,
  FaCar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const amenities = [
  { icon: <FaWifi size={30} />, name: "Free Wi-Fi" },
  { icon: <FaSwimmingPool size={30} />, name: "Swimming Pool" },
  { icon: <FaUtensils size={30} />, name: "Restaurant" },
  { icon: <FaDumbbell size={30} />, name: "Gym" },
  { icon: <FaCar size={30} />, name: "Free Parking" },
];

const Amenities = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "restart none restart none", // 🔁 replay on scroll up/down
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  const handleViewMore = () => {
    navigate("/amenities");
  };

  return (
    <section
      ref={sectionRef}
      id="amenities"
      className="py-16 bg-gray-100 text-center"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-green-900 mb-6">Amenities</h2>
        <div className="w-24 h-1 bg-yellow-600 mx-auto mb-12"></div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {amenities.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition cursor-pointer"
              onClick={handleViewMore}
            >
              <div className="text-yellow-600 mb-3">{item.icon}</div>
              <h3 className="text-gray-800 font-semibold">{item.name}</h3>
            </div>
          ))}
        </div>

        <button
          onClick={handleViewMore}
          className="mt-10 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          View All Amenities →
        </button>
      </div>
    </section>
  );
};

export default Amenities;
