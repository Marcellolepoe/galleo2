"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Mail } from "lucide-react";

export function Security() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 2000); // Toggles visibility every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-sm text-center">
      <h2 className="text-lg font-semibold text-gray-800">Your Emails Stay Private</h2>
      <p className="text-gray-600 text-sm mb-4">We don’t see your emails. Only you do.</p>
      
      <div className="relative flex items-center justify-center h-32">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: visible ? 1 : 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute"
        >
          <Mail className="w-16 h-16 text-blue-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0 : 1 }}
          transition={{ duration: 1.5 }}
          className="absolute"
        >
          <Eye className="w-16 h-16 text-gray-400" />
        </motion.div>
      </div>
    </div>
  );
}
