"use client";

import { useState } from "react";

export function AIDrafting() {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleDraft = [
    "Dear Client,",
    "Thank you for reaching out.",
    "Based on your inquiry, we recommend filing under NICE Class 35 & 41.",
    "We’ve also estimated the filing fees to be SGD 450.",
    "Let us know if you need any refinements!",
    "Best regards,",
    "[Your Firm]",
  ];

  const generateDraft = async () => {
    setLoading(true);
    setDraft("");
    for (let i = 0; i < exampleDraft.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulates AI writing effect
      setDraft((prev) => prev + "\n" + exampleDraft[i]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "16px", borderRadius: "8px", border: "1px solid #ddd", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <div>
        <p style={{ fontSize: "14px", color: "#666" }}>AI-Drafted Response:</p>

        <div style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "6px", background: "#fff", fontSize: "14px", minHeight: "100px" }}>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
            {draft || (loading ? "Generating draft..." : "Click 'Generate Draft' to begin.")}
          </pre>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <button onClick={generateDraft} disabled={loading} style={{ padding: "8px 12px", borderRadius: "4px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
            {loading ? "Generating..." : "Generate Draft"}
          </button>
          <button style={{ padding: "8px 12px", borderRadius: "4px", background: "#f8f9fa", border: "1px solid #ccc", cursor: "pointer" }}>
            Refine Tone
          </button>
          <button style={{ padding: "8px 12px", borderRadius: "4px", background: "#f8f9fa", border: "1px solid #ccc", cursor: "pointer" }}>
            Make it Concise
          </button>
        </div>
      </div>
    </div>
  );
}
