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

  const refinedDraft = ` Dear Client,\n\nThank you for your inquiry.\n\nAfter reviewing your request, we recommend filing under Classes 35 & 41 for proper trademark protection.\n\nThe estimated filing fees for this application are SGD 450.\n\nPlease let us know if you have any further questions.\n\nBest regards,\n[Your Firm]`;

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
    <div className="relative w-full rounded-xl bg-[#1F2A37] p-6 shadow-sm" ref={containerRef}>
      <div className="space-y-6">
        <div className="text-black text-sm bg-white p-4 rounded-xl font-sans">
          {draft && draft.split("\n").map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              className="whitespace-pre-wrap break-words mb-1"
              style={{ lineHeight: "1.2" }}
            >
              {text || "\u00A0"} {/* Prevents missing first letter */}
            </motion.p>
          ))}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full max-w-xs">
            <input
              type="text"
              value="Please Be More Formal and Professional"
              readOnly
              placeholder="Enter your prompt here"
              className="w-full px-3 py-2 border border-[#A0A2A5] rounded-xl bg-[#E7E7E7] text-black text-sm cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#5F6368] transition-all duration-300 ease-in-out hover:border-[#5F6368]"
              style={{
                position: "relative",
                paddingRight: "25px",
              }}
            />
           
          </div>
          <div className="w-full max-w-xs">
            <button
              type="button"
              onClick={handleRefineDraft}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-[#4E5B62] text-white rounded-xl text-sm font-medium hover:bg-[#3C474D] disabled:bg-[#A0A2A5] transition-all duration-300 ease-in-out"
            >
              {isGenerating ? "Generating..." : "Prompt Galleo (Click Here!)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
