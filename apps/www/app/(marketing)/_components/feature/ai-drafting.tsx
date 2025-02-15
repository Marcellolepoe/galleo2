"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AIDrafting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [draft, setDraft] = useState(
    `Hey there,\n\nAppreciate you reaching out!\n\nYou’ll probably want to file under Class 35 & 41 for your trademark.\n\nThe filing fees should be around SGD 450.\n\nLet me know if you need any changes!\n\nCheers,\n\n[Your Firm]`
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const refinedDraft = ` Dear Client,\n\nThank you for your inquiry.\n\nAfter reviewing your request, we recommend filing under Classes 35 & 41 for proper trademark protection.\n\nThe estimated filing fees for this application are SGD 450.\n\nPlease let us know if you have any further questions.\n\nBest regards,\n\n[Your Firm]`;

  const handleRefineDraft = () => {
    setIsGenerating(true);
    setDraft("");
    let index = 0;
    const interval = setInterval(() => {
      setDraft((prev) => prev + (refinedDraft[index] || ""));
      index++;
      if (index >= refinedDraft.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 10); // Fast word-by-word effect
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm" ref={containerRef}>
      <div className="space-y-4">
        <div className="text-foreground text-sm bg-white p-6 rounded-lg border border-gray-300 font-sans">
          {draft && draft.split("\n").map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="whitespace-pre-wrap break-words mb-2"
              style={{ lineHeight: "1.4" }}
            >
              {text || "\u00A0"} {/* Prevents missing first letter */}
            </motion.p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value="Make this formal and professional"
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
