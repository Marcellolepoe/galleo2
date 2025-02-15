"use client";

import { useState } from "react";

export function AIDrafting() {
  const [draft, setDraft] = useState(
    `Dear Client,\nThank you for reaching out.\nBased on your inquiry, we recommend filing under NICE Class 35 & 41.\nWe’ve also estimated the filing fees to be SGD 450.\nLet us know if you need any refinements!\nBest regards,\n[Your Firm]`
  );

  const refinedDraft = `Dear Valued Client,\nWe appreciate your inquiry and are pleased to assist you.\nAfter careful analysis, we recommend filing under NICE Class 35 & 41.\nThe estimated filing fees amount to SGD 450.\nShould you require any refinements or further clarifications, please do not hesitate to reach out.\nYours sincerely,\n[Your Firm]`;

  const [input, setInput] = useState("");

  const handleRefineDraft = () => {
    if (input.trim().length > 0) {
      setDraft(refinedDraft);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "16px", borderRadius: "8px", border: "1px solid #ddd", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", fontFamily: "inherit", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <div>
        <div style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "6px", background: "#fff", fontSize: "14px", minHeight: "100px", fontFamily: "inherit", whiteSpace: "pre-wrap" }}>
          <pre>{draft || "Generating response..."}</pre>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
          <input
            type="text"
            value={input}
            placeholder="Type your request here..."
            onChange={(e) => setInput(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit", width: "100%" }}
          />
          <button
            type="button"
            onClick={handleRefineDraft}
            disabled={input.trim().length === 0}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              background: input.trim().length === 0 ? "#ccc" : "#007bff",
              color: "#fff",
              border: "none",
              cursor: input.trim().length === 0 ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "background 0.2s",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
