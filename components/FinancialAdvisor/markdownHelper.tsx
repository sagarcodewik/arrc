"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink } from "lucide-react";

type Props = {
  content: string;
};

export const MarkdownRenderer = ({ content }: Props) => {
  return (
    <div
      className="
        prose prose-sm max-w-none
        prose-headings:text-slate-900
        prose-p:text-slate-700
        prose-strong:text-slate-900
        prose-ul:pl-5
        prose-li:marker:text-purple-500
        prose-a:text-purple-600
        prose-a:underline
        prose-a:cursor-pointer
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-purple-600 hover:text-purple-700"
            >
              {children}
              <ExternalLink className="w-3 h-3" />
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
