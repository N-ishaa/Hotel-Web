import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleBookNow = () => {
    navigate("/booking");
  };

  const handleSignup = () => {
    if (!isLoggedIn) {
      navigate("/auth"); // go to signup page
    } else {
      logout(); // optional: keep logout logic if needed
    }
  };

  const handleHomeClick = () => {
    const jumpToTop = () => {
      const html = document.documentElement;
      const prevScroll = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prevScroll;
    };

    if (window.location.pathname === "/") {
      jumpToTop();
    } else {
      navigate("/");
      setTimeout(jumpToTop, 50);
    }
  };

  const handleInstantJump = (id) => {
    const jump = () => {
      const section = document.getElementById(id);
      if (section) {
        const yOffset = -80;
        const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
        const html = document.documentElement;
        const prevScroll = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo(0, y);
        html.style.scrollBehavior = prevScroll;
      }
    };

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(jump, 100);
    } else {
      jump();
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <h1
          onClick={handleHomeClick}
          className="text-2xl font-serif font-bold text-green-900 cursor-pointer"
        >
          Hotel <span className="text-yellow-600">IP</span> Residency
        </h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-6 font-medium text-gray-700 items-center">
            <li>
              <button onClick={handleHomeClick} className="hover:text-yellow-600 transition">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleInstantJump("about")} className="hover:text-yellow-600 transition">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleInstantJump("rooms")} className="hover:text-yellow-600 transition">
                Rooms
              </button>
            </li>
            <li>
              <button onClick={() => handleInstantJump("amenities")} className="hover:text-yellow-600 transition">
                Amenities
              </button>
            </li>
            <li>
              <button onClick={() => handleInstantJump("menu")} className="hover:text-yellow-600 transition">
                Menu
              </button>
            </li>
            <li>
              <button onClick={() => handleInstantJump("contact")} className="hover:text-yellow-600 transition">
                Contact
              </button>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSignup}
              className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
            >
              Signup
            </button>
            <button
              onClick={handleBookNow}
              className="bg-yellow-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-900 transition"
            >
              Book Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
