"use client";

import { motion } from "framer-motion";
import { MailCheck, ShieldCheck } from "lucide-react";

export function Secure() {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-sm text-center">
      <h2 className="text-lg font-semibold text-gray-800">Your Emails Stay Private</h2>
      <p className="text-gray-600 text-sm mb-4">We don’t see your emails. Only you do.</p>
      
      <div className="relative flex items-center justify-center h-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute"
        >
          <MailCheck className="w-16 h-16 text-blue-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-0 right-0"
        >
          <ShieldCheck className="w-10 h-10 text-green-500" />
        </motion.div>
      </div>
    </div>
  );
}
