"use client";

import TradingViewTicker from "@/components/TradingViewTicker";
import { useMarketStatus } from "./useMarketStatus";

export default function MarketsPage() {
  const { time, isOpen } = useMarketStatus();

  return (
    <div className="min-h-screen bg-[#0A1220] text-white px-6 py-8 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-[#101A2B] p-3 rounded-xl text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isOpen ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="font-medium">
              {isOpen ? "Markets Open" : "Markets Open"}
            </span>
            <span className="text-gray-400 ml-2">🕒 {time}</span>
          </div>

          <div className="text-yellow-400">
            Data delayed ~15 minutes • Updated continuously
          </div>
        </div>
        <TradingViewTicker />
      </div>

      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Your ARRC Portfolio</h2>
        <p className="text-gray-400">
          Track the stocks you've earned through your purchases
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#101A2B] p-6 rounded-xl space-y-2">
            <div className="text-sm text-gray-400">Total Portfolio Value</div>
            <div className="text-3xl font-bold">$0.00</div>
          </div>
          <div className="bg-[#101A2B] p-6 rounded-xl space-y-2">
            <div className="text-sm text-gray-400">Total Gain/Loss</div>
            <div className="text-3xl font-bold text-green-400">
              +$0.00 (+0.00%)
            </div>
          </div>
          <div className="bg-[#101A2B] p-6 rounded-xl space-y-2">
            <div className="text-sm text-gray-400">Holdings</div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm text-gray-500">different stocks</div>
          </div>
        </div>
      </div>

      <div className="bg-[#101A2B] p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">📈 Your Stock Holdings</h3>
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <div className="text-5xl mb-4">📦</div>
          <div className="text-lg font-semibold">No Holdings Yet</div>
          <p className="text-sm mt-2">
            Start shopping with ARRC merchant partners to earn stock rewards and
            build your portfolio!
          </p>
        </div>
      </div>
    </div>
  );
}
