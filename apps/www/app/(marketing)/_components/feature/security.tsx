"use client";

import { useState } from "react";

export function SecureEmailPipeline() {
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
    <div className="w-full max-w-md mx-auto bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">Secure Email Processing</h2>
      
      <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-200 text-gray-700 text-sm">
        Processing {processedCount} / {emails.length} Emails
      </div>

      <button
        onClick={handleProcessEmails}
        disabled={processing}
        className="w-full mt-4 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:bg-gray-700"
      >
        {processing ? "Processing..." : "Start Processing"}
      </button>
    </div>
  );
}
