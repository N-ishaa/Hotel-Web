import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import restaurant images
import RMenu1 from "../assets/webp/RMenu1.webp";
import RMenu2 from "../assets/webp/RMenu2.webp";
import RMenu3 from "../assets/webp/RMenu3.webp";
import RMenu4 from "../assets/webp/RMenu4.webp";
import RMenu5 from "../assets/webp/RMenu5.webp";
import RMenu6 from "../assets/webp/RMenu6.webp";

// Import bar images
import BMenu1 from "../assets/webp/BMenu1.webp";
import BMenu2 from "../assets/webp/BMenu2.webp";
import BMenu3 from "../assets/webp/BMenu3.webp";
import BMenu4 from "../assets/webp/BMenu4.webp";
import BMenu5 from "../assets/webp/BMenu5.webp";
import BMenu6 from "../assets/webp/BMenu6.webp";

gsap.registerPlugin(ScrollTrigger);

const MenuSection = () => {
  const [activeMenu, setActiveMenu] = useState("restaurant");
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    // ✅ Use local ScrollTriggers only for this section
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".menu-item");

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse", // replay on scroll up/down
              onLeave: () => gsap.set(item, { opacity: 1 }), // stay visible
              onLeaveBack: () => gsap.set(item, { opacity: 1 }),
            },
          }
        );
      });

      gsap.fromTo(
        ".menu-title, .menu-buttons, .see-more",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            onLeave: () =>
              gsap.set(".menu-title, .menu-buttons, .see-more", {
                opacity: 1,
              }),
            onLeaveBack: () =>
              gsap.set(".menu-title, .menu-buttons, .see-more", {
                opacity: 1,
              }),
          },
        }
      );
    }, sectionRef);

    // ✅ Cleanup only local triggers, not global
    return () => ctx.revert();
  }, [activeMenu]);

  const restaurantMenu = [
    {
      name: "Grilled Salmon with Lemon Butter Sauce",
      desc: "Fish fillet with a citrusy glaze for perfection, served with seasonal vegetables.",
      price: "₹1200",
      img: RMenu1,
    },
    {
      name: "Classic Caesar Salad",
      desc: "Crispy romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
      price: "₹600",
      img: RMenu2,
    },
    {
      name: "Beef Wellington",
      desc: "Juicy beef fillet wrapped in puff pastry, served with wine sauce.",
      price: "₹1050",
      img: RMenu3,
    },
    {
      name: "Vegetarian Pasta Primavera",
      desc: "Classic pasta with fresh vegetables in a light tomato sauce.",
      price: "₹700",
      img: RMenu4,
    },
    {
      name: "Margherita Pizza",
      desc: "Classic pizza with fresh mozzarella, basil, and tomato sauce.",
      price: "₹850",
      img: RMenu5,
    },
    {
      name: "Chocolate Lava Cake",
      desc: "Warm chocolate cake with molten center and vanilla ice cream.",
      price: "₹550",
      img: RMenu6,
    },
  ];

  const barMenu = [
    {
      name: "Classic Mojito",
      desc: "White rum, fresh lime, mint leaves, sugar, and soda water.",
      price: "₹500",
      img: BMenu1,
    },
    {
      name: "Old Fashioned",
      desc: "Bourbon, sugar, bitters, and orange twist.",
      price: "₹550",
      img: BMenu2,
    },
    {
      name: "Signature Margarita",
      desc: "Tequila, triple sec, lime juice, and salt rim.",
      price: "₹525",
      img: BMenu3,
    },
    {
      name: "Craft Beer Selection",
      desc: "A variety of local and imported beers.",
      price: "₹400",
      img: BMenu4,
    },
    {
      name: "Whiskey Sour",
      desc: "Whiskey, lemon juice, and sugar syrup for a smooth sip.",
      price: "₹530",
      img: BMenu5,
    },
    {
      name: "Negroni",
      desc: "Gin, Campari, and sweet vermouth served on ice.",
      price: "₹600",
      img: BMenu6,
    },
  ];

  const menuData = activeMenu === "restaurant" ? restaurantMenu : barMenu;

  const handleSeeMore = () => {
    if (activeMenu === "restaurant") navigate("/restaurant-menu");
    else navigate("/bar-menu");
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="py-20 bg-green-900 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          className="text-4xl font-bold text-center mb-12 menu-title"
          style={{ color: "#de7a0f" }}
        >
          Drinks & Restaurant Menu
        </h2>
        <div className="w-24 h-1 bg-yellow-600 mx-auto mb-12"></div>

        <p className="text-gray-200 mb-6 menu-title">
          Experience exquisite flavors crafted by our expert chefs and
          mixologists. Whether you crave a refreshing cocktail or a gourmet
          meal, our menu offers something for every palate.
        </p>

        <div className="flex justify-center gap-4 mb-10 menu-buttons">
          <button
            onClick={() => setActiveMenu("restaurant")}
            className={`px-6 py-2 rounded-full font-semibold border ${
              activeMenu === "restaurant"
                ? "bg-yellow-600 text-white"
                : "bg-white text-green-900 hover:bg-yellow-500 hover:text-white"
            }`}
          >
            Restaurant Menu
          </button>
          <button
            onClick={() => setActiveMenu("bar")}
            className={`px-6 py-2 rounded-full font-semibold border ${
              activeMenu === "bar"
                ? "bg-yellow-600 text-white"
                : "bg-white text-green-900 hover:bg-yellow-500 hover:text-white"
            }`}
          >
            Bar Menu
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {menuData.map((item, index) => (
            <div
              key={index}
              className="menu-item bg-white text-green-900 rounded-2xl shadow-md overflow-hidden flex items-center hover:scale-105 transition-transform"
            >
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-28 h-28 object-cover opacity-0 transition-opacity duration-700 ease-in-out"
                onLoad={(e) => (e.target.style.opacity = 1)}
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
                <p className="text-yellow-600 font-semibold mt-2">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 see-more">
          <button
            onClick={handleSeeMore}
            className="bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-700 transition-colors"
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
