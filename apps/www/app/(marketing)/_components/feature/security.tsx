"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SecureEmailPipeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const emails = ["Email 1", "Email 2", "Email 3", "Email 4", "Email 5"];
  const [processedCount, setProcessedCount] = useState(0);
  const [processing, setProcessing] = useState(false);

  const handleProcessEmails = () => {
    setProcessing(true);
    setProcessedCount(0);
    let index = 0;
    const interval = setInterval(() => {
      setProcessedCount((prev) => prev + 1);
      index++;
      if (index >= emails.length) {
        clearInterval(interval);
        setProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm" ref={containerRef}>
      <div className="space-y-2">
        <div className="text-foreground text-sm bg-white p-4 rounded-lg border border-gray-300 font-sans">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-gray-600"
          >
            Processing {processedCount} / {emails.length} Emails
          </motion.p>
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleProcessEmails}
            disabled={processing}
            className="w-full px-4 py-1.5 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:bg-gray-700"
          >
            {processing ? "Processing..." : "Start Processing"}
          </button>
        </div>
      </div>
    </div>
  );
}
