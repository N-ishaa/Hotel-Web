import React, { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

// Import your local image
import hotelImage from "../assets/webp/HeroPage.webp"; 

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🎞️ Image animation (left side)
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "restart none restart none",
            invalidateOnRefresh: true,
          },
        }
      );

      // 🎞️ Text animation (right side)
      gsap.fromTo(
        textRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "restart none restart none",
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLearnMore = () => {
    navigate("/about-more");
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div ref={imageRef}>
          <img
            src={hotelImage} // 👈 Your local image
            alt="Hotel Interior"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div ref={textRef}>
<h2 className="text-4xl font-bold text-green-900 mb-2 inline-block relative">
  About Our Hotel
  <span className="absolute left-1/2 w-24 h-1 bg-yellow-600 -translate-x-1/2" style={{ bottom: '-8px' }}></span>
</h2>

<p className="text-gray-700 leading-relaxed mt-12 mb-6">
  <span className="font-semibold text-yellow-700">Hotel IP Residency</span>{" "}
  stands as a beacon of luxury and comfort in the heart of the city. With years of
  hospitality excellence, we take pride in delivering unforgettable experiences to
  our guests. Every corner reflects our commitment to comfort, from our elegant
  rooms to our world-class amenities and exceptional service.
</p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-gray-800 mb-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-600" size={20} />
              <span>24/7 Concierge Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-600" size={20} />
              <span>Free High-Speed WiFi</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-600" size={20} />
              <span>Fine Dining Restaurant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-yellow-600" size={20} />
              <span>Fitness Center & Spa</span>
            </div>
          </div>

          {/* 👇 Button */}
          <button
            onClick={handleLearnMore}
            className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            About More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
