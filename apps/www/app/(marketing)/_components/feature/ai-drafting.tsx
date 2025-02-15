"use client";

import { useState } from "react";

export function AIDrafting() {
  const [draft, setDraft] = useState(
    `Dear Client,\n\nThank you for reaching out.\n\nBased on your inquiry, we recommend filing under NICE Class 35 & 41.\n\nWe’ve also estimated the filing fees to be SGD 450.\n\nLet us know if you need any refinements!\n\nBest regards,\n\n[Your Firm]`
  );

  const refinedDraft = `Dear Valued Client,\n\nWe appreciate your inquiry and are pleased to assist you.\n\nAfter careful analysis, we recommend filing under NICE Class 35 & 41.\n\nThe estimated filing fees amount to SGD 450.\n\nShould you require any refinements or further clarifications, please do not hesitate to reach out.\n\nYours sincerely,\n\n[Your Firm]`;

  const handleRefineDraft = () => {
    setDraft(refinedDraft);
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-4 text-foreground text-sm bg-white p-6 rounded-lg border border-gray-300" style={{ fontFamily: "inherit" }}>
          <pre className="whitespace-pre-wrap break-words" style={{ lineHeight: "1.6" }}>{draft}</pre>
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
            className="w-full px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900"
          >
            Prompt Galleo
          </button>
        </div>
      </div>
    </div>
  );
}
