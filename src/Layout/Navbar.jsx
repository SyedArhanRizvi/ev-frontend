// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Simulated auth state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <Link to="/login-page">Login</Link>
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
          <Link
            to="/authentication"
            onClick={toggleMenu}
            className="block hover:text-green-400"
          >
            Login
          </Link>

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
