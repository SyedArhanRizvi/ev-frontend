import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useWebContext } from "../context/WebContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { API_LINK, isLogin, setIsLogin } = useWebContext();
  const getUserInfo = async () => {
    try {
      const userInfo = await axios.get(
        `${API_LINK}/api/auth/get-account-info`,
        {
          withCredentials: true,
        }
      );
      if (userInfo.data.user.username) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(
        "There are some errors in your getUserInfo controller plz fix the bug first ",
        error
      );
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.get(`${API_LINK}/api/auth/logout`, {
        withCredentials: true,
      });
      setIsLogin(false);
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error during logout");
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md  fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="text-xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/">⚡ EV Booster</Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 gap-10">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hover:text-green-400 transition"
            >
              <Link to="/">Home</Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hover:text-green-400 transition"
            >
              <Link to="/ev-map">EV Map</Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hover:text-green-400 transition"
            >
              {isLogin ? (
                <button onClick={handleLogout} className="cursor-pointer">
                  Logout
                </button>
              ) : (
                <Link to="/login-page">Login</Link>
              )}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="hover:text-green-400 transition"
            >
              <Link to="/admin-page">Admin</Link>
            </motion.div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-gray-800 px-4 py-2 space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            onClick={toggleMenu}
            className="block hover:text-green-400"
            to="/"
          >
            Home
          </Link>
          <Link
            to="/ev-map"
            onClick={toggleMenu}
            className="block hover:text-green-400"
          >
            EV Map
          </Link>
          {isLogin ? (
            <button onClick={handleLogout} className="cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login-page">Login</Link>
          )}

          <Link
            to="/admin-page"
            onClick={toggleMenu}
            className="block hover:text-green-400"
          >
            Admin
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
