import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { gsap } from "gsap";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { login, register } = useAuth(); 
  const formRef = useRef(null);
  const navigate = useNavigate();

  // Animation
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const showPopup = async (title, text, icon = "info") => {
    await Swal.fire({
      title,
      text,
      icon,
      background: "linear-gradient(to right, #064e3b, #10b981)",
      color: "white",
      confirmButtonColor: "#facc15",
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

    if (isSignup) {
      // SIGNUP
      const res = await register(formData.name, formData.email, formData.password);
      if (!res.success) {
        await showPopup("Signup Failed", res.msg, "error");
        return;
      }

      await showPopup("Signup Successful!", "You can now login.", "success");
      // Redirect to login page
      setIsSignup(false);
      setFormData({ name: "", email: formData.email, password: "" });
      navigate("/auth");

    } else {
      // LOGIN
      const res = await login(formData.email, formData.password);
      if (!res.success) {
        await showPopup("Login Failed", res.msg, "error");
        return;
      }

      await showPopup("Login Successful!", "You are now logged in.", "success");
      // Redirect to home page
      navigate("/");
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
