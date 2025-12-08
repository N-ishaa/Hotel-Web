import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

// Components
import Hero from "./components/Hero";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Amenities from "./components/Amenities";
import Comments from "./components/Comments";
import MenuSection from "./components/MenuSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";

// Pages
import AuthPage from "./components/AuthPage";
import BookingForm from "./components/BookingForm";
import RestaurantMenuPage from "./components/RestaurantMenuPage";
import BarMenuPage from "./components/BarMenuPage";

// New Pages
import AmenitiesPage from "./pages/AmenitiesPage";
import AboutMore from "./pages/AboutMore";
import Stays from "./pages/Stays";

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MainApp />
      </Router>
    </AuthProvider>
  );
};

const MainApp = () => {
  const navigate = useNavigate();

  // Global Book Now logic — just go to booking page
  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <>
      <Header onBookNow={handleBookNow} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <main className="pt-20">
              <Hero />
              <About />
              <Rooms />
              <Amenities />
              <Comments />
              <MenuSection />
              <Contact />
            </main>
          }
        />

        {/* Auth, Booking & Gallery */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Restaurant & Bar */}
        <Route path="/restaurant-menu" element={<RestaurantMenuPage />} />
        <Route path="/bar-menu" element={<BarMenuPage />} />

        {/* Amenities */}
        <Route path="/amenities" element={<AmenitiesPage />} />

        {/* About More */}
        <Route path="/about-more" element={<AboutMore />} />

        {/* All Rooms */}
        <Route path="/stays" element={<Stays />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
