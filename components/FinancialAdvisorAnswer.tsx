import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";

export default function FinancialAdvisorAnswer({ answer }: { answer: string }) {
  if (!answer) return null;

  return (
    <div className="mt-5 rounded-2xl border border-purple-200 bg-white shadow-lg">
      <div className="flex items-center gap-2 px-5 py-3 border-b bg-purple-50">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <h4 className="text-sm font-semibold text-purple-800">
          AI Financial Insight
        </h4>
      </div>

      <div className="p-5 prose prose-sm max-w-none prose-headings:text-slate-900 prose-li:marker:text-purple-500 prose-strong:text-slate-900">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {answer}
        </ReactMarkdown>
      </div>
    </div>
  );
}
