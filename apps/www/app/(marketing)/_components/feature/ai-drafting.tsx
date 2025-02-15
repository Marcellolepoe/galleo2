"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AIDrafting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [draft, setDraft] = useState(
    `Dear Client,\n\nThank you for reaching out.\n\nBased on your inquiry, we recommend filing under NICE Class 35 & 41.\n\nWe’ve also estimated the filing fees to be SGD 450.\n\nLet us know if you need any refinements!\n\nBest regards,\n\n[Your Firm]`
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const refinedDraft = `Dear Valued Client,\n\nWe appreciate your inquiry and are pleased to assist you.\n\nAfter careful analysis, we recommend filing under NICE Class 35 & 41.\n\nThe estimated filing fees amount to SGD 450.\n\nShould you require any refinements or further clarifications, please do not hesitate to reach out.\n\nYours sincerely,\n\n[Your Firm]`;

  const handleRefineDraft = () => {
    setIsGenerating(true);
    setDraft("");
    let index = 0;
    const interval = setInterval(() => {
      setDraft((prev) => prev + refinedDraft[index]);
      index++;
      if (index === refinedDraft.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 10); // Fast word-by-word effect
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm" ref={containerRef}>
      <div className="space-y-4">
        <div className="space-y-4 text-foreground text-sm bg-white p-6 rounded-lg border border-gray-300" style={{ fontFamily: "inherit" }}>
          {draft.split("\n").map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="whitespace-pre-wrap break-words"
              style={{ lineHeight: "1.6" }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value="Refine your tone"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
          />
          <button
            type="button"
            onClick={handleRefineDraft}
            disabled={isGenerating}
            className="w-full px-4 py-1.5 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 disabled:bg-gray-700"
          >
            {isGenerating ? "Generating..." : "Prompt Galleo"}
          </button>
        </div>
      </div>
    </div>
  );
}
