import { Sparkles } from "lucide-react";
import { MarkdownRenderer } from "./markdownHelper";
import { FooterNote } from "./FooterNote";

export default function FinancialAdvisorAnswer({
  answer,
  question,
}: {
  answer: string;
  question: string;
}) {
  if (!answer) return null;

  return (
    <div className="mt-5 rounded-2xl border border-purple-200 bg-white shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <h4 className="text-sm font-semibold text-purple-800">
          AI Financial Insight
        </h4>
      </div>
      <div className="p-5">
        <MarkdownRenderer content={answer} />
      </div>

      <FooterNote question={question} />
    </div>
  );
}

