import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 👇 Import your local hero image
import heroImage from"../assets/webp/HeroPage.webp";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Kill previous ScrollTriggers before creating new ones
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      const elements = [headingRef.current, textRef.current, buttonRef.current];

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "restart none restart none",
              invalidateOnRefresh: true,
              onLeaveBack: () => gsap.set(el, { opacity: 1 }),
            },
          }
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="h-screen bg-cover bg-center flex items-center justify-center text-center text-white relative"
      style={{
        backgroundImage: `url(${heroImage})`, // 👈 Local image here
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-serif font-bold mb-6 drop-shadow-lg"
        >
          Welcome to{" "}
          <span className="text-yellow-500">Hotel IP Residency</span>
        </h2>

        <p
          ref={textRef}
          className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed"
        >
          Experience luxury, comfort, and elegance in the heart of the city.
        </p>

        <Link
          ref={buttonRef}
          to="/gallery"
          className="bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-900 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Explore Hotel
        </Link>
      </div>
    </section>
  );
};

export default Hero;
