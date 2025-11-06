import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Hotel Info */}
        <div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#ff6600" }}>
            Hotel IP Residency
          </h3>
          <p className="text-gray-200 text-sm">
            Experience comfort and luxury with our premium rooms, world-class
            amenities, and warm hospitality. Your perfect stay awaits.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3 " style={{ color: "#ff6600" }}>
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#home" className="hover:text-yellow-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-yellow-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#rooms" className="hover:text-yellow-400 transition">
                Rooms
              </a>
            </li>
            <li>
          
              <a href="#contact" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-3 " style={{ color: "#ff6600" }}>
            Contact Us
          </h4>
          <p className="text-sm text-gray-200">📍 123 Residency Road, Delhi</p>
          <p className="text-sm text-gray-200">📞 +91 7011082937</p>
          <p className="text-sm text-gray-200">📧 ukainth6@ipresidency.com</p>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm border-t border-gray-700 mt-8 pt-4">
        © {new Date().getFullYear()} Hotel IP Residency. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
