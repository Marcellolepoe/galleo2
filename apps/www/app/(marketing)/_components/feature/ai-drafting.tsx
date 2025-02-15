"use client";

import { useState } from "react";

export function AIDrafting() {
  const [draft, setDraft] = useState(
    `Dear Client,\nThank you for reaching out.\nBased on your inquiry, we recommend filing under NICE Class 35 & 41.\nWe’ve also estimated the filing fees to be SGD 450.\nLet us know if you need any refinements!\nBest regards,\n[Your Firm]`
  );

  const refinedDraft = `Dear Valued Client,\nWe appreciate your inquiry and are pleased to assist you.\nAfter careful analysis, we recommend filing under NICE Class 35 & 41.\nThe estimated filing fees amount to SGD 450.\nShould you require any refinements or further clarifications, please do not hesitate to reach out.\nYours sincerely,\n[Your Firm]`;

  const handleRefineDraft = () => {
    setDraft(refinedDraft);
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-muted-foreground text-sm">AI-Drafted Response:</div>
        </div>
        <div className="space-y-4 text-foreground text-sm bg-white p-4 rounded-lg border border-gray-300 overflow-auto max-h-60">
          <pre className="whitespace-pre-wrap break-words">{draft}</pre>
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
