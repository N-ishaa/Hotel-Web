import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LazyImage = ({ src, alt }) => {
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    });
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
      {visible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-50 scale-105 blur-sm"
          }`}
        />
      )}
    </div>
  );
};

const BarMenuPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".section-title", {
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }),
        onEnterBack: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }),
        start: "top 85%",
      });

      ScrollTrigger.batch(".menu-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }),
        onEnterBack: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }),
        start: "top 90%",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const Cold = import.meta.glob("../assets/webp/CMenu*.webp", { eager: true });
  const Beer = import.meta.glob("../assets/webp/BEMenu*.webp", { eager: true });
  const Daru = import.meta.glob("../assets/webp/AMenu*.webp", { eager: true });

  const coldDrinks = Object.values(Cold).map((v, i) => ({
    name: [
      "Virgin Mojito",
      "Lemon Iced Tea",
      "Blue Lagoon",
      "Strawberry Cooler",
      "Mango Smoothie",
      "Classic Cold Coffee",
      "Mint Lemonade",
      "Pineapple Punch",
    ][i],
    img: v.default,
  }));

  const beerMenu = Object.values(Beer).map((v, i) => ({
    name: [
      "Kingfisher Premium",
      "Budweiser",
      "Heineken",
      "Corona Extra",
      "Bira White",
      "Hoegaarden",
      "Carlsberg Smooth",
      "Tuborg Strong",
    ][i],
    img: v.default,
  }));

  const daruMenu = Object.values(Daru).map((v, i) => ({
    name: [
      "Black Label Whisky",
      "Old Monk Rum",
      "Smirnoff Vodka",
      "Jack Daniel’s",
      "Bacardi White Rum",
      "Chivas Regal",
      "Blenders Pride",
      "Royal Stag",
    ][i],
    img: v.default,
  }));

  const handleBackClick = () => navigate("/#menu");

  const renderSection = (title, items) => (
    <section key={title} className="mb-12">
      <h2 className="section-title text-3xl font-bold text-center mb-6" style={{ color: "#de7a0f" }}>
        {title}
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="menu-card bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <LazyImage src={item.img} alt={item.name} />
            <div className="p-4 text-green-900 text-center">
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div ref={pageRef} className="bg-green-900 min-h-screen text-white py-16 px-8 mt-20 text-center">
      <h1 className="section-title text-4xl font-bold mb-4" style={{ color: "#dc9800" }}>
        Drinks
      </h1>
      <div className="w-24 h-1 bg-yellow-600 mx-auto mb-10"></div>

      {renderSection("Cold & Normal Drinks", coldDrinks)}
      {renderSection("Beer Selection", beerMenu)}
      {renderSection("Liquor Collection", daruMenu)}

      <div className="text-center mt-10">
        <button
          onClick={handleBackClick}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
        >
          ← Back to Menu Selection
        </button>
      </div>
    </div>
  );
};

export default BarMenuPage;
