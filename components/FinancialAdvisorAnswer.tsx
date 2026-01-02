// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Sparkles, ExternalLink } from "lucide-react";

// export default function FinancialAdvisorAnswer({ answer }: { answer: string }) {
//   if (!answer) return null;

//   return (
//     <div className="mt-5 rounded-2xl border border-purple-200 bg-white shadow-lg overflow-hidden">
//       {/* HEADER */}
//       <div className="flex items-center gap-2 px-5 py-3 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
//         <Sparkles className="w-4 h-4 text-purple-600" />
//         <h4 className="text-sm font-semibold text-purple-800">
//           AI Financial Insight
//         </h4>
//       </div>

//       {/* CONTENT */}
//       <div
//         className="
//           p-5 
//           prose prose-sm max-w-none
//           prose-headings:text-slate-900
//           prose-p:text-slate-700
//           prose-strong:text-slate-900
//           prose-ul:pl-5
//           prose-li:marker:text-purple-500
//           prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
//         "
//       >
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             a: ({ node, ...props }) => (
//               <a
//                 {...props}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-1 text-purple-600 font-medium"
//               >
//                 {props.children}
//                 <ExternalLink className="w-3 h-3" />
//               </a>
//             ),
//           }}
//         >
//           {answer}
//         </ReactMarkdown>
//       </div>

//       {/* FOOTER NOTE */}
//       <div className="px-5 py-3 border-t border-purple-100 bg-purple-50/50 text-xs text-purple-700 flex items-center gap-2">
//         <Sparkles className="w-3 h-3" />
//         <span>
//           AI-Powered: Internet-grounded response. Consult a professional for
//           major decisions.
//         </span>
//       </div>
//     </div>
//   );
// }

