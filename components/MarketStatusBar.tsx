"use client";

import { useMarketStatus } from "../components/MarketsPage/useMarketStatus";

export default function MarketStatusBar() {
  const { time, isOpen } = useMarketStatus();

  return (
    <div className="flex items-center justify-between rounded-xl bg-[#1B2738] px-5 py-3 text-sm text-gray-300">


      <div className="flex items-center gap-3">
        <span
          className={`h-2 w-2 rounded-full ${
            isOpen ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="font-medium">
          {isOpen ? "Markets Open" : "Markets Closed"}
        </span>
        <span className="text-gray-400">
          {time}
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-300">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="text-yellow-400"
        >
          <path
            d="M3 12h4l2-5 4 10 2-5h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>
          Data delayed <span className="text-yellow-400">~15 minutes</span>
          <span className="mx-1">·</span>
          Updated continuously
        </span>
      </div>
    </div>
  );
}
