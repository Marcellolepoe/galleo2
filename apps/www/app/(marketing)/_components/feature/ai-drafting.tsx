"use client";

import { useState } from "react";
import { Button } from "@galleo/ui/components/base/button";

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
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm">
      <div className="space-y-4">
        <div className="text-muted-foreground text-sm">AI-Drafted Response:</div>

        <div className="space-y-2 border rounded-lg p-4 bg-white shadow text-sm">
          <pre className="text-foreground whitespace-pre-wrap">
            {draft || (loading ? "Generating draft..." : "Click 'Generate Draft' to begin.")}
          </pre>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateDraft} variant="primary" disabled={loading}>
            {loading ? "Generating..." : "Generate Draft"}
          </Button>
          <Button variant="outline">Refine Tone</Button>
          <Button variant="outline">Make it Concise</Button>
        </div>
      </div>
    </div>
  );
}
