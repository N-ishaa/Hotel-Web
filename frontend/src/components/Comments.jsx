import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import user1 from "../assets/webp/review1.webp";
import user2 from "../assets/webp/review2.webp";
import user3 from "../assets/webp/review3.webp";
import user4 from "../assets/webp/review4.webp";

gsap.registerPlugin(ScrollTrigger);

const allComments = [
  {
    name: "Cristine Barkely",
    image: user1,
    text: "Absolutely loved my stay at Hotel IP Residency! The rooms were spotless, and the staff was incredibly welcoming. Will definitely visit again. The food in the hotel restaurant was delicious and the service was top-notch.",
    rating: 4,
  },
  {
    name: "Bernadette",
    image: user2,
    text: "Hotel IP Residency exceeded all my expectations. From the warm welcome to the cozy rooms, everything was perfect. I felt right at home. Loved the attention to detail and the calm environment. Will come back for sure.",
    rating: 5,
  },
  {
    name: "James Miller",
    image: user3,
    text: "Very comfortable stay. The amenities were modern and well-maintained. Great experience overall!",
    rating: 4,
  },
  {
    name: "Sophia Johnson",
    image: user4,
    text: "The hospitality was amazing. Staff were friendly and helpful, and the rooms were neat and cozy.",
    rating: 5,
  },
];

const Comments = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🎬 Section heading animation
      gsap.fromTo(
        sectionRef.current.querySelector("h2"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector("h2"),
            start: "top 85%",
            toggleActions: "restart none restart none",
            invalidateOnRefresh: true,
          },
        }
      );

      // 🎬 Line animation
      gsap.fromTo(
        sectionRef.current.querySelector(".line"),
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          transformOrigin: "center",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".line"),
            start: "top 90%",
            toggleActions: "restart none restart none",
            invalidateOnRefresh: true,
          },
        }
      );

      // 💬 Review cards animation
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
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
  }, [showAll]);

  const displayedComments = showAll ? allComments : allComments.slice(0, 2);

  return (
    <section id="comments" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* 🏷️ Heading */}
        <h2 className="text-4xl font-bold text-green-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="w-24 h-1 bg-yellow-600 mx-auto mb-12 line"></div>

        {/* 💬 Review Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {displayedComments.map((review, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col space-y-4 transform hover:-translate-y-2 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-600"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{review.name}</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{review.text}</p>

              {/* ⭐ Star Rating */}
              <div className="flex space-x-1 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 👇 View More Button */}
        <div className="text-center mt-12">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              View All Reviews
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-full font-semibold transition-all"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comments;
