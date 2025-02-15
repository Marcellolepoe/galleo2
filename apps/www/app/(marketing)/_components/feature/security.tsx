"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Secure() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [processedEmails, setProcessedEmails] = useState(0);
  const [processing, setProcessing] = useState(false);

  const handleProcessEmails = () => {
    setProcessing(true);
    setProcessedEmails(0);

    let index = 0;
    const interval = setInterval(() => {
      setProcessedEmails((prev) => prev + 1);
      index++;
      if (index >= 5) {
        clearInterval(interval);
        setProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-2"
      >
        <div className="text-foreground text-sm bg-white p-4 rounded-lg border border-gray-300">
          <p className="text-gray-600">Secure Processing 123:</p>
          <p className="text-gray-700 text-sm">
            Processed {processedEmails} / 5 Emails
          </p>
        </div>
        <button
          onClick={handleProcessEmails}
          disabled={processing}
          className="w-full px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:bg-gray-700"
        >
          {processing ? "Processing..." : "Start Secure Processing"}
        </button>
      </motion.div>
    </div>
  );
}
