import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";
function Home() {

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gray-900 text-white gap-10 md:gap-16">
      {/* Left side: Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/ev1.jpeg"
          alt="Electric Vehicle"
          className="rounded-2xl shadow-xl w-full max-w-md md:max-w-lg object-cover"
        />
      </div>

      {/* Right side: Content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex flex-col justify-center gap-8"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Drive the Future with <br />
          <span className="text-green-400">Electric Vehicles</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-gray-300 leading-relaxed tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Electric Vehicles (EVs) offer zero emissions, lower running costs, and
          a sustainable way to travel. Discover nearby charging stations and
          embrace the power of green technology today.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Go to Map Button */}
          <Link to="/ev-map">
            <button
              className="group flex items-center justify-center gap-2 
               bg-green-500 hover:bg-green-600 active:scale-95 
               transition-all duration-300 px-6 h-10 cursor-pointer w-48 
               rounded-full text-white font-semibold 
               shadow-xl hover:shadow-green-400/40"
            >
              <FaMapMarkedAlt className="text-lg group-hover:scale-110 transition-transform" />
              Go to Map
            </button>
          </Link>

          <Link to="/">
            <button
              className="group flex items-center justify-center gap-2 
               border border-white hover:bg-white hover:text-gray-900 
               active:scale-95 transition-all duration-300 
               px-6 h-10 cursor-pointer w-48 rounded-full text-white 
               font-semibold shadow-xl hover:shadow-white/30"
            >
              <FaInfoCircle className="text-lg group-hover:rotate-12 transition-transform" />
              Learn More
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
