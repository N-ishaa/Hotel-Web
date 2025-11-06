import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Import all images dynamically
const images = import.meta.glob("../assets/optimized/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const getImage = (fileName) => {
  const path = `../assets/optimized/${fileName}`;
  return images[path]?.default || "";
};

const stays = [
  { img: getImage("room1.webp"), title: "Single Suite" },
  { img: getImage("room2.webp"), title: "Double Suite" },
  { img: getImage("room3.webp"), title: "Deluxe Suite" },
  { img: getImage("room4.webp"), title: "Family Suite" },
  { img: getImage("room5.webp"), title: "Executive Suite" },
  { img: getImage("room6.webp"), title: "Poolside Villa" },
  { img: getImage("room7.webp"), title: "Luxury Penthouse" },
  { img: getImage("room8.webp"), title: "Royal Suite" },
];

const Stays = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // ✨ Animate each card on scroll
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-8 text-center overflow-hidden">
      <h1 className="text-5xl font-bold text-green-900 mb-12">Our Luxury Stays</h1>
        <div className="w-24 h-1 bg-yellow-600 mx-auto mb-10"></div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {stays.map((stay, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={stay.img}
              alt={stay.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{stay.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stays;
