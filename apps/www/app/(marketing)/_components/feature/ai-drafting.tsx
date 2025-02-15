"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { Button } from "@galleo/ui/components/base/button";

export function AIDrafting() {
  const [draft, setDraft] = useState("");
  const controls = useAnimation();

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
    setDraft("");
    for (let i = 0; i < exampleDraft.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setDraft((prev) => prev + "\n" + exampleDraft[i]);
    }
  };

  return (
    <div className="relative w-full rounded-lg bg-background p-6 shadow-sm">
      <div className="space-y-4">
        <div className="text-muted-foreground text-sm">AI-Drafted Response:</div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 border rounded-lg p-4 bg-white shadow"
        >
          <pre className="text-foreground text-sm whitespace-pre-wrap">{draft || "Generating draft..."}</pre>
        </motion.div>

        <div className="flex gap-2">
          <Button onClick={generateDraft} variant="primary">Generate Draft</Button>
          <Button variant="outline">Refine Tone</Button>
          <Button variant="outline">Make it Concise</Button>
        </div>
      </div>
    </div>
  );
}
