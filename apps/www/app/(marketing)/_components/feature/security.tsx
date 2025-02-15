"use client";

import { useState } from "react";

export function SecureEmailPipeline() {
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
    <div className="relative w-full max-w-lg mx-auto rounded-lg bg-white p-6 shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Secure Email Pipeline</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
        <p className="text-gray-600 font-medium mb-2">Incoming Emails:</p>
        <div className="space-y-2">
          {emails.map((email, index) => (
            <div
              key={index}
              className={`p-2 rounded-md text-sm text-gray-700 transition-all ${
                processedEmails.includes(email) ? "bg-green-100 border border-green-400 text-green-800" : "bg-gray-200 border border-gray-300"
              }`}
            >
              {email}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={processEmails}
        disabled={processing}
        className="w-full mt-4 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:bg-gray-700"
      >
        {processing ? "Processing..." : "Process Emails Securely"}
      </button>
    </div>
  );
}
