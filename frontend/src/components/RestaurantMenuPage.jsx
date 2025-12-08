// RestaurantMenuPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Import images
import Veg1 from "../assets/webp/VMenu1.webp"; 
import Veg2 from "../assets/webp/VMenu2.webp"; 
import Veg3 from "../assets/webp/VMenu3.webp";
import Veg4 from "../assets/webp/VMenu4.webp"; 
import Veg5 from "../assets/webp/VMenu5.webp"; 
import Veg6 from "../assets/webp/VMenu6.webp"; 
import Veg7 from "../assets/webp/VMenu7.webp"; 
import Veg8 from "../assets/webp/VMenu8.webp"; 
import NonVeg1 from "../assets/webp/NMenu1.webp"; 
import NonVeg2 from "../assets/webp/NMenu2.webp"; 
import NonVeg3 from "../assets/webp/NMenu3.webp"; 
import NonVeg4 from "../assets/webp/NMenu4.webp"; 
import NonVeg5 from "../assets/webp/NMenu5.webp"; 
import NonVeg6 from "../assets/webp/NMenu6.webp"; 
import NonVeg7 from "../assets/webp/NMenu7.webp"; 
import NonVeg8 from "../assets/webp/NMenu8.webp"; 
import Junk1 from "../assets/webp/JMenu1.webp"; 
import Junk2 from "../assets/webp/JMenu2.webp"; 
import Junk3 from "../assets/webp/JMenu3.webp"; 
import Junk4 from "../assets/webp/JMenu4.webp"; 
import Junk5 from "../assets/webp/JMenu5.webp"; 
import Junk6 from "../assets/webp/JMenu6.webp"; 
import Junk7 from "../assets/webp/JMenu7.webp"; 
import Junk8 from "../assets/webp/JMenu8.webp";
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return null;
};

const LazyImage = ({ src, alt }) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="w-full h-48 bg-gray-200 overflow-hidden relative rounded-t-xl"
    >
      {visible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            loaded ? "opacity-100 scale-100 blur-0" : "opacity-60 scale-105 blur-sm"
          }`}
        />
      )}
    </div>
  );
};

const RestaurantMenuPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const handleBackToMenu = () => {
    navigate("/#menu");
    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Combine all menu items
  const allMenu = [
    // Veg
    { name: "Buttered Cottage", img: Veg1 },
    { name: "Spiced Mixed Vegetable Rice", img: Veg2 },
    { name: "Green Peas and Cottage", img: Veg3 },
    { name: "Spinach and Sweet Corn", img: Veg4 },
    { name: "Potato and Cauliflower", img: Veg5 },
    { name: "Stir-Fried Rice with Vegetables", img: Veg6 },
    { name: "Chickpeas Curry", img: Veg7 },
    { name: "Red Kidney Bean Curry", img: Veg8 },
    // Non-Veg
    { name: "Butter Chicken", img: NonVeg1 },
    { name: "Chicken Biryani", img: NonVeg2 },
    { name: "Fish Curry", img: NonVeg3 },
    { name: "Mutton Rogan Josh", img: NonVeg4 },
    { name: "Chicken Tikka Masala", img: NonVeg5 },
    { name: "Egg Curry", img: NonVeg6 },
    { name: "Tandoori Chicken", img: NonVeg7 },
    { name: "Prawn Masala", img: NonVeg8 },
    // Junk
    { name: "Cheese Burger", img: Junk1 },
    { name: "French Fries", img: Junk2 },
    { name: "Veg Pizza", img: Junk3 },
    { name: "Chicken Pizza", img: Junk4 },
    { name: "Loaded Nachos", img: Junk5 },
    { name: "Grilled Sandwich", img: Junk6 },
    { name: "Crispy Momos", img: Junk7 },
    { name: "Spring Rolls", img: Junk8 },
  ];

  // GSAP animation
  useEffect(() => {
    if (!pageRef.current) return;

    ScrollTrigger.batch(".menu-card", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
        ),
      onLeaveBack: (batch) =>
        gsap.to(batch, { opacity: 0, y: 50, duration: 0.5, ease: "power2.inOut" }),
      start: "top 90%",
      toggleActions: "restart none restart none",
      invalidateOnRefresh: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-green-900 min-h-screen text-white py-16 px-8 mt-20 text-center"
    >
      <ScrollToTop />

      <h1 className="text-4xl font-bold mb-4" style={{ color: "#dc9800" }}>
        Chef’s Best Picks — Our Signature Dishes
      </h1>
      <div className="w-24 h-1 bg-yellow-600 mx-auto mb-10"></div>

      <div className="grid md:grid-cols-4 gap-6">
        {allMenu.map((item, i) => (
          <div
            key={i}
            className="menu-card bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <LazyImage src={item.img} alt={item.name} />
            <div className="p-4 text-green-900 text-center">
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleBackToMenu}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
        >
          ← Back to Menu Selection
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
