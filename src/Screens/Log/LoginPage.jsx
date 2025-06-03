import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useWebContext } from '../../context/WebContext';
import axios from 'axios';

function LoginPage() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const { API_LINK, setIsLogin } = useWebContext();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const registerUser = await axios.post(
        `${API_LINK}/api/auth/login-account`,
        formData, {
          withCredentials:true
        }
      );
      console.log(registerUser.status);
      setIsLogin(true);
      if (registerUser.status == 200) {
        navigate('/ev-map');
      }
    } catch (error) {
      console.log("There are some errors during user login.", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-gray-800 p-10 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2 text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full h-12 px-4 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          
          <div>
            <label className="block text-gray-300 mb-2 text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-green-500 hover:bg-green-600 transition duration-300 rounded-md text-white font-semibold shadow-lg text-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-base">
          Don't have an account?{' '}
          <Link to="/register-page" className="text-green-400 hover:text-green-600 font-semibold">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
