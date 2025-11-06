import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { gsap } from "gsap";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // ✅ Animate form on mount
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  // ✅ SweetAlert reusable function
  const showPopup = async (title, text, icon = "info") => {
    await Swal.fire({
      title,
      text,
      icon,
      background: "linear-gradient(to right, #064e3b, #10b981)", // greens
      color: "white",
      confirmButtonColor: "#facc15", // yellow accent
      confirmButtonText: "OK",
      customClass: {
        popup: "rounded-3xl shadow-lg",
        title: "text-2xl font-bold",
        confirmButton: "px-6 py-2 rounded-lg text-black font-semibold",
      },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      const existingUser = users.find((u) => u.email === formData.email);
      if (existingUser) {
        await showPopup(
          "Account Exists",
          "This email is already registered. Please login instead.",
          "warning"
        );
        setIsSignup(false);
        setFormData({ email: formData.email, password: "" });
        return;
      }

      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      await showPopup("Signup Successful!", "Please login now to continue.", "success");
      setIsSignup(false);
      setFormData({ email: formData.email, password: "" });
    } else {
      const user = users.find((u) => u.email === formData.email);
      if (!user) {
        await showPopup("No Account Found", "No user found with this email. Please sign up.", "error");
        setIsSignup(true);
        return;
      }

      if (user.password !== formData.password) {
        await showPopup("Incorrect Password", "The password you entered is wrong.", "error");
        return;
      }

      await showPopup("Login Successful!", "Redirecting to booking page...", "success");
      login(user);
      navigate("/booking");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-green-900 to-green-800">
      <div
        ref={formRef}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 text-white border border-white/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400 drop-shadow-lg">
          {isSignup ? "Create an Account" : "Login to Continue"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-white/80 text-sm">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-yellow-400 font-semibold ml-2 hover:underline transition-colors"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
