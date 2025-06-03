import React, { useState } from "react";
import { motion } from "framer-motion";
import { useWebContext } from "../../context/WebContext";
import axios from "axios";

import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const navigate = useNavigate();
  const { API_LINK, setIsLogin } = useWebContext();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const registerUser = await axios.post(
        `${API_LINK}/api/auth/create-new-account`,
        formData,
        {
          withCredentials: true,
        }
      );
      setIsLogin(true)
      if (registerUser.status === 201) {
        navigate("/ev-map");
      }
    } catch (error) {
      console.log("There are some errors during user registration.", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col  md:flex-row bg-gray-900 text-white">
  
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-800 p-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/ev2.jpeg"
            alt="EV Station"
            className="w-full max-w-sm mx-auto rounded-xl shadow-lg mb-6"
          />
          <h2 className="text-3xl font-bold mb-4 text-green-400">
            Join the EV Revolution
          </h2>
          <p className="text-gray-300">
            Register to explore electric vehicle stations, track your usage, and
            be a part of the clean energy movement.
          </p>
        </motion.div>
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-gray-300 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 transition duration-300 py-2 rounded-md text-white font-semibold shadow-lg"
            >
              Register
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterPage;
