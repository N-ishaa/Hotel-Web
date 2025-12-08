import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // ⭐ API Base URL
  const API_URL = "http://localhost:5000/api/auth";

  // 🔥 Load user + token from localStorage when app starts
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (err) {
      console.error("Error loading saved user:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  // 🔥 LOGIN
  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return { success: false, msg: data.msg || "Login failed" };
      }

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      setLoading(false);
      return { success: true }; // caller will redirect to Home
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return { success: false, msg: "Something went wrong" };
    }
  };

  // 🔥 REGISTER
  const register = async (name, email, password) => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return { success: false, msg: data.msg || "Registration failed" };
      }

      setLoading(false);
      return { success: true }; // caller will redirect to Login
    } catch (error) {
      console.error("Register error:", error);
      setLoading(false);
      return { success: false, msg: "Something went wrong" };
    }
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
