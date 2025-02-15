"use client";

import { useState, useEffect } from "react";
import { Mail } from "lucide-react";

export function Security() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 2000); // Toggles visibility every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-sm text-center">
      <h2 className="text-lg font-semibold text-gray-800">Your Emails Stay Private</h2>
      <p className="text-gray-600 text-sm mb-4">We don’t see your emails. Only you do.</p>
      
      <div className="flex items-center justify-center h-32">
        <Mail className={`w-16 h-16 text-blue-500 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-20"}`} />
      </div>
    </div>
  );
}
