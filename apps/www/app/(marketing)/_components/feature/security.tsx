"use client";

import { motion } from "framer-motion";

export function Security() {
  return (
    <div className="relative flex items-center justify-center w-full h-96 bg-black rounded-xl shadow-2xl overflow-hidden">
      
      {/* Outer Cyber Security Rings */}
      <motion.div
        className="absolute w-96 h-96 border-[5px] border-blue-500 opacity-30 rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute w-72 h-72 border-[3px] border-blue-400 opacity-50 rounded-full"
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      ></motion.div>

      {/* Simple Glowing Circle */}
      <motion.div
        className="relative z-10 w-20 h-20 bg-blue-500 rounded-full shadow-lg border-[5px] border-white"
        animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {/* Soft Glow */}
        <motion.div
          className="absolute w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-lg"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </div>
  );
}
