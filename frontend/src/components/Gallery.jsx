import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getImage = (name) => new URL(`../assets/optimized/${name}`, import.meta.url).href;

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
    <div ref={imgRef} className="w-full h-56 bg-gray-200 overflow-hidden rounded-xl">
      {visible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            loaded ? "opacity-100 blur-0 scale-100" : "opacity-50 blur-md scale-105"
          }`}
        />
      )}
    </div>
  );
};

const Gallery = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const ctx = gsap.context(() => {
      // Section headings
      ScrollTrigger.batch(".section-title", {
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }),
        onEnterBack: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }),
        start: "top 85%",
      });

      // Cards animation
      ScrollTrigger.batch(".gallery-card", {
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }),
        onEnterBack: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }),
        start: "top 90%",
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // --- Data ---
  const delights = [
    { img: getImage("restaurant1.webp"), title: "MEGU", desc: "Modern Japanese cuisine with an artistic touch." },
    { img: getImage("restaurant2.webp"), title: "LE CIRQUE", desc: "Finest Franco-Italian dining with world-class wines." },
    { img: getImage("restaurant3.webp"), title: "JAMAVAR", desc: "Royal Indian flavours in Maharaja-style ambience." },
    { img: getImage("restaurant4.webp"), title: "THE QUBE", desc: "Global gastronomy meets modern presentation." },
    { img: getImage("restaurant5.webp"), title: "SPICE TRAIL", desc: "A culinary journey through aromatic Indian spices." },
    { img: getImage("restaurant6.webp"), title: "CAFE BREEZE", desc: "Light bites and coffee with a garden view." },
    { img: getImage("restaurant7.webp"), title: "SKY LOUNGE", desc: "Rooftop dining with mesmerizing skyline views." },
    { img: getImage("restaurant8.webp"), title: "BAKED BLISS", desc: "Sweet indulgence with handcrafted pastries." },
  ];

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

  const events = [
    { img: getImage("event1.webp"), title: "Celebration", desc: "Make every celebration a luxurious affair." },
    { img: getImage("event2.webp"), title: "Cheers Club", desc: "Because every meetup deserves a toast." },
    { img: getImage("event3.webp"), title: "Birthday Parties", desc: "Joyful setups that make your day special." },
    { img: getImage("event4.webp"), title: "Date Nights", desc: "Candlelight, connection, and conversations that never fade." },
    { img: getImage("event5.webp"), title: "Champagne Cheers", desc: "A toast to unforgettable celebrations." },
    { img: getImage("event6.webp"), title: "Wedding Celebration", desc: "Elegant venues for your dream wedding." },
    { img: getImage("event7.webp"), title: "Family Festivity", desc: "Celebrate precious moments with your loved ones in warmth and joy." },
    { img: getImage("event8.webp"), title: "Engagement Events", desc: "Cherish the start of your journey in style." },
  ];

  const Section = ({ title, items }) => (
  <section className="max-w-7xl mx-auto px-6 mb-20">
    <h2 className="section-title text-4xl font-bold mb-3 text-green-900 uppercase tracking-wide">
      {title}
    </h2>
    {/* ✅ Short yellow bar instead of long underline */}
    <div className="w-24 h-1 bg-yellow-600 mx-auto mb-10"></div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="gallery-card bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <LazyImage src={item.img} alt={item.title} />
          <div className="p-4 text-left">
            <h3 className="font-bold text-lg mb-2 text-green-900 uppercase tracking-wide">
              {item.title}
            </h3>
            {item.desc && (
              <p className="text-green-800 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);


  return (
    <div ref={galleryRef} className="bg-[#f8faf8] py-20 text-center text-green-900">
      <Section title="Epicurean Delights" items={delights} />
      <Section title="Exclusive Stay Experiences" items={stays} />
      <Section title="Celebrations" items={events} />

      <div className="text-center mt-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
        >
          ⬆ Scroll to Top
        </button>
      </div>
    </div>
  );
};

export default Gallery;
