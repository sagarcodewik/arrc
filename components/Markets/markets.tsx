"use client";

import TradingViewTicker from "@/components/TradingViewTicker";
import { useMarketStatus } from "./useMarketStatus";
import { API_PORTFOLIO_GET } from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { useEffect, useState } from "react";
import { useLivePrices } from "../useLivePrices";

export default function MarketsPage() {
  const { time, isOpen } = useMarketStatus();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await getApiWithOutQuery({
          url: API_PORTFOLIO_GET,
        });

        if (res?.success) {
          setData(res.data || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const assets = useLivePrices(data).filter(
    (item) =>
      item.assetName && item.assetName !== "Unknown" && item.investedAmount > 0
  );

  const totalInvested = assets.reduce((s, a) => s + (a.investedAmount || 0), 0);

  const totalValue = assets.reduce(
    (s, a) => s + (a.currentValue || a.investedAmount || 0),
    0
  );

  const profitLoss = totalValue - totalInvested;

  const profitLossPercent =
    totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0A1220] text-white px-6 py-8 space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between bg-[#101A2B] p-3 rounded-xl text-sm">
          <div className="flex gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isOpen ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span>{isOpen ? "Markets Open" : "Markets Closed"}</span>
            <span className="ml-2">🕒 {time}</span>
          </div>
          <div className="text-yellow-400">Data delayed ~15 minutes</div>
        </div>
        <TradingViewTicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#101A2B] p-6 rounded-xl">
          <div className="text-gray-400 text-sm">Total Portfolio Value</div>
          <div className="text-3xl font-bold">${totalValue.toFixed(2)}</div>
        </div>

        <div className="bg-[#101A2B] p-6 rounded-xl">
          <div className="text-gray-400 text-sm">Total Gain/Loss</div>
          <div
            className={`text-3xl font-bold ${
              profitLoss >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {profitLoss >= 0 ? "+" : "-"}${Math.abs(profitLoss).toFixed(2)} (
            {profitLossPercent.toFixed(2)}%)
          </div>
        </div>

        <div className="bg-[#101A2B] p-6 rounded-xl">
          <div className="text-gray-400 text-sm">Holdings</div>
          <div className="text-3xl font-bold">{assets.length}</div>
        </div>
      </div>
      <div className="bg-[#101A2B] p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">📈 Your Stock Holdings</h3>

        {assets.map((item) => (
          <div
            key={item._id}
            className="flex justify-between bg-[#0A1220] p-4 rounded-lg mb-3"
          >
            <div>
              <div className="font-semibold">{item.assetName}</div>
              <div className="text-sm text-gray-400">
                Invested: ${item.investedAmount.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                ${item.currentValue.toFixed(2)}
              </div>
              <div
                className={`text-sm ${
                  item.profitLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {item.profitLoss >= 0 ? "+" : "-"}$
                {Math.abs(item.profitLoss).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
