"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SecureEmailPipeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [processedEmails, setProcessedEmails] = useState([]);
  const emails = ["Email 1", "Email 2", "Email 3", "Email 4", "Email 5"];
  const [processing, setProcessing] = useState(false);

  const processEmails = () => {
    setProcessing(true);
    setProcessedEmails([]);
    let index = 0;
    const interval = setInterval(() => {
      setProcessedEmails((prev) => [...prev, emails[index]]);
      index++;
      if (index >= emails.length) {
        clearInterval(interval);
        setProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm" ref={containerRef}>
      <div className="space-y-4">
        <div className="text-foreground text-sm bg-white p-6 rounded-lg border border-gray-300 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="whitespace-pre-wrap break-words mb-2"
            style={{ lineHeight: "1.4" }}
          >
            <p className="text-gray-600">Incoming Emails:</p>
            {emails.map((email, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: processedEmails.includes(email) ? 1 : 0.3 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-2 my-1 rounded-md text-sm ${processedEmails.includes(email) ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-600"}`}
              >
                {email}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={processEmails}
            disabled={processing}
            className="w-full px-4 py-1.5 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:bg-gray-700"
          >
            {processing ? "Processing..." : "Process Emails Securely"}
          </button>
        </div>
      </div>
    </div>
  );
}
