"use client";

import { ExternalLink, Sparkles } from "lucide-react";

export const FooterNote = ({ question }: { question: string }) => {
  if (!question) return null;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    question
  )}`;

  return (
    <div className="px-5 py-3 border-t border-purple-100 bg-purple-50/50 text-xs text-purple-700 flex items-start gap-2">

      <a
        href={googleSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-medium text-purple-700 hover:underline"
      >
        
         <ExternalLink className="w-3 h-3" />
        Internet-grounded response based on your question
       
      </a>
    </div>
  );
};

